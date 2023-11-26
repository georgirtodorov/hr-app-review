import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../../../services/pages/user/user.service'
import {EmployeesService} from '../../../services/pages/employees/employees.service';
import {SalariesService} from '../../../services/pages/salaries/salaries.service';
import {AbsencesArchiveService} from '../../../services/pages/settings/absences-archive.service';
import {AbsencesService} from '../../../services/pages/absences/absences.service'
import {MatDialog} from '@angular/material/dialog';
import {Employee} from '../../../classes/pages/Employee'
import {Overlay, ScrollStrategyOptions} from '@angular/cdk/overlay';
import {SwalService} from "../../../services/helpers/swal/swal.service";
import {EmployeeProfileComponent} from '../employee-profile/employee-profile.component';
// import {ProfileDialogComponent} from '../employee-profile/dialog/profile-dialog.component';
import {ProfileDialogComponent} from '../profile/dialog/profile-dialog.component';
import {RegisterDialogComponent} from '../user/register/register-dialog.component';
import {EmployeesListService} from "../../../services/pages/employees-list/employees-list.service";

@Component({
    selector: 'employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

    private loader = this.swal_service.loader();
    public filter_current = '';
    public filter_past = '';
    public employees = [];
    public past_employees = [];
    private absences_archive;
    private absence_requests;
    public users = []


    constructor(
        private user_service: UserService,
        private employees_list_service: EmployeesListService,
        private salaries_service: SalariesService,
        private absence_archive_service: AbsencesArchiveService,
        private absences_service: AbsencesService,
        private swal_service: SwalService,
        private dialog: MatDialog,
        private overlay: Overlay
    ) {
    }

    ngOnInit(): void {
        this.getEmployees();
        this.getAbsenceArchive();
        this.getAbsenceRequests();
        this.loader.close();
        // this.url_path = this.platformLocation.protocol + this.platformLocation.hostname;
        // console.log(this.url_path)
        // this.http.get(this.url_path).subscribe(
        //     result => {
        //         console.log(result);
        //         this.employees = result;
        //     }, error => {
        //         console.log(error);
        //     }
        // )
    }

    private getAbsenceArchive(): void {
        this.absence_archive_service.get().subscribe(result => {
            this.absences_archive = result;
            console.log(this.absences_archive)
        });
    }


    private getAbsenceRequests(): void {
        this.absences_service.get().subscribe(
            result => {
                // this.formatSickLeave(leave_requests);
                this.absence_requests = result;
                console.log(this.absence_requests)
                // this.initSummarizedData();
            }
        )
    }

    private formatSickLeave(requests): any {
        this.absence_requests.current_year = requests.filter(r => {
            return +new Date(r.end_date).getFullYear() >= +new Date().getFullYear();
        });
        this.absence_requests.past_years = requests.filter(r => {
            return new Date(r.end_date).getFullYear() < new Date().getFullYear();
        })
    };


    private getEmployees(): void {
        this.employees_list_service.getEmployees().subscribe(
            result => {
                this.employees = result.filter(e => {
                    return e.end == null;
                })
                this.past_employees = result.filter(e => {
                    return e.end != null;
                })
                // console.log(this.employees)
                // console.log(this.past_employees)
            }, error => {
                console.log(error);
            }
        )
    }

    public register() {
        const dialogRef = this.dialog.open(RegisterDialogComponent, {
            autoFocus: false,
            disableClose: false,
            maxHeight: "80vh",
            minWidth: "50vw"
        });
        dialogRef.afterClosed().subscribe(result => {
            if (!result.id) {
                return;
            }

            let employee: Employee = Object.create(null);
            employee.user_id = result.id;
            employee.first_name = result.first_name;
            employee.last_name = result.last_name;
            employee.email = result.email;

            this.add(employee).subscribe(result => {
                if (!result.id) {
                    this.swal_service.error({title: 'Грешка', titleText: 'dsada'});
                }
                employee.id = result.id;
                this.employees.unshift(employee);
                this.swal_service.success({
                    title: 'Потребителят e регистриран успешно.',
                    html: 'Може да добавите данните на служителя.'
                }).then(() => this.open(employee));
            }, error => {
                this.swal_service.error({title: 'Грешка', titleText: 'error.error'})
            });
        });
    }

    public open(employee) {
        const dialogRef = this.dialog.open(ProfileDialogComponent, {
            data: {
                employee: employee,
                absences: {
                    requests: this.absence_requests.filter(request => request.employee_id === employee.id),
                    archive: this.absences_archive.filter(archieved => archieved.employee_id === employee.id)
                }
            },
            autoFocus: false,
            disableClose: false,
            // maxHeight: "80vh",
            // minWidth: "50vw",
            height: '80vh',  // Set the fixed height
            width: '80vw',   // Set the fixed width
        });

        dialogRef.afterClosed().subscribe(result => {
            this.employees = this.employees.map(e => e.id === result.id ? result : e);
        });
    }

    public add(employee): Observable<any> {
        return this.employees_list_service.addEmployee(employee);
    }

    public delete(employee) {
        this.swal_service.confirm({titleText: 'Желате ли да премахнете ' + employee.first_name + ' ' + employee.last_name + ' от списъка със служители?'})
            .then(result => {
                if (!result.isConfirmed) {
                    return
                }
                this.employees_list_service.deleteEmployee(employee.id).subscribe(result => {
                    if (!result) {
                        this.swal_service.error({title: 'Грешка', titleText: 'error.error'});
                        return
                    }
                    this.user_service.delete(employee.user_id).subscribe(result => {
                        if (!result) {
                            this.swal_service.error({title: 'Грешка', titleText: 'Някаква грешка с Юзър'})
                        }
                        this.employees = this.employees.filter(e => e.id !== employee.id);
                        this.swal_service.success({title: 'Потребителят е премахнат.'});
                    }, error => {
                        this.swal_service.error({title: 'Грешка', titleText: error.error})
                    })
                })
            }, error => {
                this.swal_service.error({title: 'Грешка', titleText: error.error})
            })
    }

    public filteringCurrent(event: Event): void {
        this.filter_current = String(event);
        console.log(event);
    }

    public filteringPast(event: Event): void {
        this.filter_past = String(event);
        console.log(event);
    }

    getWaitingApprovals(absence_requests: any) {
        // Filter absence requests with 'approval' property equal to 'WAITING'
        const waitingApprovals = absence_requests.filter((data) => data.approval === "WAITING");

        // Use reduce to sum the 'days' property of the filtered objects
        const totalDays = waitingApprovals.reduce((acc, request) => acc + request.days, 0);

        return totalDays;
    }

    getSickLeaves(absence_requests: any) {
        const currentYear = new Date().getFullYear(); // Get the current year

        const waitingApprovals = absence_requests.filter((data) => {
            let type = data.type_name
            let year =new Date(data.start_date).getFullYear()
            return (
                type == "Временна нетрудоспособност" &&
                year == currentYear
            );
        });

        // Use reduce to sum the 'days' property of the filtered objects
        const totalDays = waitingApprovals.reduce((acc, request) => acc + request.days, 0);

        return totalDays;
    }
}
