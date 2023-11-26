import {Component, OnInit, Input, ChangeDetectorRef, isDevMode, AfterContentInit, AfterViewInit} from '@angular/core';
import {AbsencesService} from "../../../../services/pages/absences/absences.service";
import {EmployeesService} from "../../../../services/pages/employees/employees.service";
import {SwalService} from '../../../../services/helpers/swal/swal.service';

import {MatDialog} from '@angular/material/dialog';
import {FilterDialogComponent} from "./filter-dialog/filter-dialog.component";
import {CalendarFilter} from "../../../../classes/pages/absence/calendar/filter";

import {CompanyDataService} from "../../../../services/helpers/company-data/company-data.service";

import {DatePipe} from '@angular/common';
import {registerLocaleData} from '@angular/common';
import localeBg from '@angular/common/locales/bg';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {DD_MMMM_YYYY_FORMAT} from "../../../../classes/dates/DateFormat";
import {MAT_DATE_FORMATS} from '@angular/material/core';

registerLocaleData(localeBg);

import {DateAdapter} from "@angular/material/core";
import {MyDateAdapter} from "../../../../classes/dates/MyDateAdapter";
import {AbsenceTypesService} from "../../../../services/pages/settings/absence-types.service";
import {
    EditRolePermissionsComponent
} from "../../access/roles/role-permissions/edit-role-permissions/edit-role-permissions.component";
import {ProfileAbsenceRequestsComponent} from "../profile-requests/profile-absence-requests.component";
import {
    PendingAbsenceRequestsComponent,
    PendingRequestsDialog
} from "../pending-requests/pending-absence-requests.component";
import {AbsenceRequestDialog} from "../request/absence-request.component";
import {RegisterAbsenceDialog} from "../register-absence/register-absence.component";
import {AbsenceRequestInterface} from "../../../../classes/pages/profile/absence/request/absence-request.interface";
import {forkJoin, Subscription} from "rxjs";
import {text} from "express";
import {ActivatedRoute} from "@angular/router";
import {UserPermissionsService} from "../../../../services/helpers/permissions/user-permissions.service";
import {OfficialHolidaysService} from "../../../../services/pages/settings/official-holidays.service";
import {Employee} from "../../../../classes/pages/Employee";

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    providers: [
        // { provide: MAT_DATE_LOCALE, useValue: 'bg' },
        {provide: DateAdapter, useClass: MyDateAdapter, deps: [MAT_DATE_LOCALE]},
        // { provide: MAT_DATE_FORMATS, useValue: DD_MMMM_YYYY_FORMAT },
    ],
})
export class CalendarComponent implements OnInit, AfterViewInit
{
    ASSETS_PATH: string = '/test/hr-app/public/assets/angular/assets/'

    week_days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    today = new Date();
    start_date: Date
    end_date: Date
    prev_start_date: Date
    prev_end_date: Date
    next_start_date: Date
    next_end_date: Date


    requests;
    employees = []

    department_names = []
    absence_types
    absence_statuses

    employee_department = 'Маркетинг'
    calendar_data = [];
    @Input() employees_absences

    filter: CalendarFilter = new CalendarFilter();
    private location_cities = [];
    private position_names: any;
    private subscriptionChange: Subscription
    private subscriptionDelete: Subscription
    routeQueryParams$: Subscription;

    private canApproveGlobal: boolean = false;
    private canApproveSupervision: boolean = false;
    public canRegisterGlobal: boolean = false;
    public canRegisterSupervision: boolean = false;
    private holidays: any;
    private employee: any;
    private default_department: string;
    private errors: boolean;

    constructor(
        private swal_service: SwalService,
        private absences_service: AbsencesService,
        private employees_service: EmployeesService,
        private company_data_service: CompanyDataService,
        public dialog: MatDialog,
        private absence_type_service: AbsenceTypesService,
        private datePipe: DatePipe,
        private dateAdapter: DateAdapter<any>,
        private route: ActivatedRoute,
        private user_permissions: UserPermissionsService,
        private holidays_service: OfficialHolidaysService
    )
    {
    }


    subscribeRequestDialog()
    {
        this.routeQueryParams$ = this.route.queryParams.subscribe(params => {
            if (params['dialog']) {

                let filtered_employee = this.employees.find(e => e.id == params['employee-id'])
                let filtered_request
                filtered_employee?.absence_requests.forEach(r => {
                    if (r.id == params['request-id']) {
                        filtered_request = r
                    }
                })

                // this.employees.forEach(employee => {
                //     console.log(employee)
                //     if (employee.id == params['employee-id']) {
                //         console.log(employee)
                //         employee.absence_requests.forEach(request => {
                //             if (request.id == params['request-id']) {
                //                 this.openEmployeeAbsenceRequests(employee, request);
                //             }
                //         })
                //     }
                // })

                setTimeout(() => {
                    console.log(filtered_employee)
                    console.log(filtered_request)
                    this.openEmployeeAbsenceRequests(filtered_employee, filtered_request);
                }, 1000);

            }
        });
    }

    bgDatePipe: DatePipe = new DatePipe('bg');

    formatDate(date: Date): string
    {
        const transformedDate = this.bgDatePipe.transform(date, 'd MMMM y');
        const dateParts = transformedDate.split(' ');

        // Capitalize the first letter of the month name
        const capitalizedMonth = dateParts[1].charAt(0).toUpperCase() + dateParts[1].slice(1);

        return `${dateParts[0]} ${capitalizedMonth} ${dateParts[2]}`;
    }

    filteredDepartments
    selectedDepartment = '';

    quickFilter(department_name): void
    {
        if (department_name != 'all') {
            this.filtered_employees = this.employees.filter(employee => employee.department_name === department_name);
            return;
        }
        this.filtered_employees = JSON.parse(JSON.stringify(this.employees));
    }

    onSearch(searchValue: string)
    {
        searchValue = searchValue.toLowerCase();
        this.filteredDepartments = this.department_names.filter(
            department => department.toLowerCase().includes(searchValue) && department !== this.employee_department
        );
    }

    ngOnInit(): void
    {
        this.swal_service.loader().fire();
        if(isDevMode()){
            this.ASSETS_PATH = '/assets/'
        }
        this.holidays_service.get().subscribe(r => this.holidays = r);
        this.absence_type_service.get().subscribe(result => {
            if (!result) {
                //some error
            }
            this.absence_types = result
        })

        this.employees_service.getEmployee().subscribe(r => {
            this.employee = r;
            this.default_department = r.department_name
        });


        this.initCalendarDays();
        // this.dateAdapter.setLocale('bg');
        this.company_data_service.getCompanyData().subscribe(result => {
            if (!result) {
                //error
            }
            this.department_names = result.departments.map(department => department.name);
            this.filteredDepartments = this.department_names;
            // this.selectedDepartment = JSON.parse(JSON.stringify(this.employee_department));
            this.position_names = result.positions.map(position => position.name);
            this.location_cities = result.locations.map(location => location.city);
            this.employees = result.employees;
            this.requests = result.employees.map(employee => employee.absence_requests).reduce((acc, current) => acc.concat(current), []);

            // this.quickFilter(this.employee_department);
            this.generateCalendar();

            this.subscribeRequestDialog();
            this.checkPermissions();
        }, error => {
            this.errors = true;
            this.swal_service.error({text: 'Company data cannot be loaded. Issue:' + error.error.error});
        })
        this.setSubscriptions();
    }

    ngAfterViewInit()
    {
        if (!this.errors) {
            this.swal_service.loader().close();
        }
    }


    ngOnDestroy()
    {
        this.routeQueryParams$.unsubscribe();
    }


    prevMonth()
    {
        this.start_date = new Date(this.prev_start_date);
        this.end_date = new Date(this.prev_end_date);
        this.calcPrevNextDates();
        this.generateCalendar();
    }

    nextMonth()
    {
        this.start_date = new Date(this.next_start_date);
        this.end_date = new Date(this.next_end_date);
        this.calcPrevNextDates();
        this.generateCalendar();
    }

    calcPrevNextDates()
    {
        this.prev_start_date = new Date(this.start_date);
        this.prev_start_date.setMonth(this.start_date.getMonth() - 1);

        this.prev_end_date = new Date(this.end_date);
        this.prev_end_date.setMonth(this.end_date.getMonth() - 1);

        this.next_start_date = new Date(this.start_date);
        this.next_start_date.setMonth(this.start_date.getMonth() + 1);

        this.next_end_date = new Date(this.end_date);
        this.next_end_date.setMonth(this.end_date.getMonth() + 1);
    }


//testingNewThings


    isToday(date)
    {
        return date.toString() == this.today.toString()
    }

    isWeekend(date)
    {
        const day = date.getDay();
        return day === 0 || day === 6;
    }

    private filterAbsences(date)
    {
        const filteredRequests = this.requests.filter(r => date >= (new Date(r.start_date)).setHours(0, 0, 0, 0) && date <= (new Date(r.end_date)).setHours(0, 0, 0, 0));
        return filteredRequests.reduce((acc, r) => {
            acc[r.employee_id] = r;
            return acc;
        }, {});

        // const filteredRequests = this.requests.filter(r => {
        //     return date >= (new Date(r.start_date)).setHours(0, 0, 0, 0) && date <= (new Date(r.end_date)).setHours(0, 0, 0, 0)
        // });
    }


    restartCalendar()
    {
        this.initCalendarDays();
        this.generateCalendar();
        this.calcPrevNextDates();
    }

    initCalendarDays()
    {
        this.start_date = new Date(this.today);
        this.end_date = new Date(this.start_date);
        this.end_date.setMonth(this.start_date.getMonth() + 1);

        this.prev_start_date = new Date(this.start_date);
        this.prev_end_date = new Date(this.end_date);
        this.next_start_date = new Date(this.start_date);
        this.next_end_date = new Date(this.end_date);
        this.calcPrevNextDates()
    }



    generateCalendar()
    {
        const dateArray = [];
        const start_date = new Date(this.start_date);

        while (start_date <= this.end_date) {
            dateArray.push({
                date: new Date(start_date),
                custom_data: {
                    weekend: this.isWeekend(start_date),
                    holiday: this.getHoliday((new Date(start_date)).setHours(0, 0, 0, 0))
                },
                absences: this.filterAbsences((new Date(start_date)).setHours(0, 0, 0, 0))
            });
            start_date.setDate(start_date.getDate() + 1);
        }
        this.calendar_data = dateArray;
        console.log(this.calendar_data)
    }

    getHoliday(start_date) {
        return this.holidays.find(h => {
            if (new Date(h.date).setHours(0, 0, 0, 0) == start_date) {
                console.log(new Date(h.date).setHours(0, 0, 0, 0))
                console.log(start_date)
                console.log(h)

            }

            return new Date(h.date).setHours(0, 0, 0, 0) === start_date;
        });
    }

//findtheabsencesbetweenfirstandlastdate

    //filter
    filtered_employees = [];
    disableNavigation = false;

    openFilterDialog()
    {
        const dialogRef = this.dialog.open(FilterDialogComponent, {
            data: {
                employees: this.employees,
                department_names: this.department_names,
                location_cities: this.location_cities,
                position_names: this.position_names,
                absence_types: this.absence_types,
                filters: JSON.parse(JSON.stringify(this.filter.filters))
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.event != 'apply') {
                return;
            }
            this.quickFilter(this.selectedDepartment);
            this.filter = result.data
            if (!this.filter.isBlank()) {
                this.filtered_employees = this.filter.makeFiltering(this.employees);
            }
        });
    }


    applyFilters(filter)
    {
        // Apply filters to your data based on the filterData object
        // For example, you can filter the employees list based on the selected locations:
        this.filtered_employees = this.employees.filter(employee => filter.locations.includes(employee.location));
        // Similarly, apply filters for department, position, and employee

        // Disable the navigation buttons
        this.disableNavigation = true;
    }

    clearFilters()
    {
        // Clear filters and restore original data
        this.filtered_employees = this.employees;
        this.filter.reset()
        this.quickFilter(this.selectedDepartment);
        // Enable the navigation buttons
        this.disableNavigation = false;
    }


    getWaitingApprovals(absence_requests: any)
    {
        return absence_requests.filter((data) => data.approval === "WAITING");
    }


    openEmployeeAbsenceRequests(employee, requests)
    {

        this.dialog.open(PendingRequestsDialog, {
            data: {
                employee: employee,
                requests: !Array.isArray(requests) ? [requests] : requests
            },
            // autoFocus: false,
            // disableClose: false,
            // minWidth: 500
            minWidth: '80vw'
        })
    }

    addRequest()
    {
        this.dialog.open(AbsenceRequestDialog, {
            data: {
                // employee: employee
            },
            // autoFocus: false,
            // disableClose: false,
            // minWidth: '80vw'
        })
    }

    registerAbsence()
    {
        this.dialog.open(RegisterAbsenceDialog, {
            data: {
                employees: this.employees,
                absence_types: this.absence_types
            },
            // autoFocus: false,
            // disableClose: false,
            // minWidth: '500'
        })
    }

    private setSubscriptions()
    {
        this.subscriptionChange = this.absences_service.dataChange.subscribe((request: AbsenceRequestInterface) => {
            this.refreshEmployeeList(request.employee_id);
            const index = this.requests.findIndex(r => r.id === request.id);
            if (index === -1) {
                this.requests.push(request);
            } else {
                this.requests[index] = request;
            }

            this.generateCalendar();
        });

        this.subscriptionDelete = this.absences_service.dataDelete.subscribe((request: AbsenceRequestInterface) => {
            this.refreshEmployeeList(request.employee_id);
            const index = this.requests.findIndex(r => r.id === request.id);
            if (index >= 0) {
                this.requests.splice(index, 1);
                this.generateCalendar();
            }
        });
    }

    private refreshEmployeeList(employee_id)
    {
        this.employees_service.getEmployees().subscribe(r => {
            if (r) {
                this.employees = r;
                this.quickFilter(this.selectedDepartment)
            }
        })

    }

    private checkPermissions(): void
    {
        // this.selectedDepartment = 'all'
        this.employees_service.getEmployee().subscribe(r => {
            this.user_permissions.hasPermission('can_approve_absence_request_supervision').subscribe(hasPermission => {
                if (hasPermission) {
                    this.canApproveSupervision = hasPermission;
                }
                if (this.selectedDepartment.length == 0) {
                    this.quickFilter(r.department_name);
                    this.selectedDepartment = JSON.parse(JSON.stringify(r.department_name));
                }
            }, error => {
                this.swal_service.error({text: error});
            });

            this.user_permissions.hasPermission('can_approve_absence_request_global').subscribe(hasPermission => {
                if (hasPermission) {
                    this.selectedDepartment = 'all'
                    this.quickFilter('all');
                    this.canApproveGlobal = hasPermission;
                }
            }, error => {
                this.swal_service.error({text: error});
            });
            this.user_permissions.hasPermission('can_register_absence_request_supervision').subscribe(hasPermission => {
                if (hasPermission) {
                    this.canRegisterSupervision = hasPermission;
                }
            }, error => {
                this.swal_service.error({text: error});
            });
            this.user_permissions.hasPermission('can_register_absence_request_global').subscribe(hasPermission => {
                if (hasPermission) {
                    this.selectedDepartment = 'all'
                    this.quickFilter('all');
                    this.canRegisterGlobal = hasPermission;
                }
            }, error => {
                this.swal_service.error({text: error});
            });
        })

    }
}




