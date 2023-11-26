import {Component, OnInit, Inject} from '@angular/core';
import {DatePipe} from '@angular/common'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormGroup, UntypedFormBuilder, Validators, FormControl, FormsModule} from '@angular/forms';
import {EmployeesService} from '../../../../services/pages/employees/employees.service';
import {SickLeaveService} from '../../../../services/pages/sick-leave/sick-leave.service';
import {Employee} from '../../../../classes/pages/Employee'
import {SwalService} from "../../../../services/helpers/swal/swal.service";

@Component({
    selector: 'register-sick-leave',
    templateUrl: './register-sick-leave.component.html',
    styleUrls: ['./register-sick-leave.component.scss']
})
export class RegisterSickLeaveComponent implements OnInit {

    public is_edit = false;
    public filter = '';
    public employees: Array<Employee> = [];
    public sick_leave_request = {
        'id': '',
        'employee_id': '',
        'start_date': '',
        'end_date': '',
        'days': '',
        'cost': ''
    };

    public form = this.fb.group({
        employee_id: ['', [Validators.required]],
        start_date: ['', [Validators.required]],
        end_date: ['', [Validators.required]],
        days: ['', [Validators.required]],
        cost: '',
    });


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private employees_service: EmployeesService,
        private sick_leave_service: SickLeaveService,
        public datepipe: DatePipe,
        private fb: UntypedFormBuilder,
        private swal_service: SwalService,
        private dialogRef: MatDialogRef<any>
    ) {
    }

    ngOnInit(): void {
        this.is_edit = (this.data?.s_request) ? true : false;
        (this.is_edit) ? this.injectEditData() : '';
        this.getEmployees();
    };

    private injectEditData(): void {
        this.sick_leave_request = {
            'id': this.data.s_request.id,
            'employee_id': this.data.s_request.employee_id,
            'start_date': this.data.s_request.start_date,
            'end_date': this.data.s_request.end_date,
            'days': this.data.s_request.days,
            'cost': this.data.s_request.cost
        }
    };

    public add(): void {
        if (this.form.valid) {
            this.sick_leave_request.start_date = this.datepipe.transform(this.sick_leave_request.start_date, 'YYYY-MM-dd');
            this.sick_leave_request.end_date = this.datepipe.transform(this.sick_leave_request.end_date, 'YYYY-MM-dd');

            this.sick_leave_service.add(this.sick_leave_request).subscribe(
                result => {
                    if (result) {
                        this.dialogRef.close(
                            this.getResponseData()
                        );
                    } else {
                        this.swal_service.error({text: 'Възникна грешка при добавянето на болничния запис, моля опитайте по-късно.'});
                    }
                }, error => {
                    this.swal_service.error({text: 'Възникна грешка при добавянето на болничния запис: ' + error.message});
                }
            )
        }
    };

    public edit(): void {
        if (this.form.valid) {
            this.sick_leave_request.start_date = this.datepipe.transform(this.sick_leave_request.start_date, 'YYYY-MM-dd');
            this.sick_leave_request.end_date = this.datepipe.transform(this.sick_leave_request.end_date, 'YYYY-MM-dd');

            this.sick_leave_service.edit(this.sick_leave_request).subscribe(
                result => {
                    if (result) {
                        this.dialogRef.close(
                            this.getResponseData()
                        );
                    } else {
                        this.swal_service.error({text: 'Възникна грешка при обновлението на болничния запис, моля опитайте по-късно.'});
                    }
                }, error => {
                    this.swal_service.error({text: 'Възникна грешка при обновлението на болничния запис: ' + error.message});
                }
            )
        }
    };

    private getEmployees(): void {
        this.employees_service.getEmployees().subscribe(
            result => {
                this.employees = result
            }, error => {
                this.swal_service.error({text: 'Възникна грешка при призмането на данните за служителите: ' + error.message});
            }
        )
    };

    public filtering(event: Event): void {
        this.filter = String(event);
    };

    private getResponseData(): any {
        return {
            'sick_leave': this.sick_leave_request,
            'employee': this.employees.filter(e => e.id == this.sick_leave_request.employee_id)
        };
    };
}
