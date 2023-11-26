import {Component, OnInit, OnDestroy, Injector, Input, Output, EventEmitter} from '@angular/core';
import {forkJoin} from 'rxjs';
import {Employee} from '../../../classes/pages/Employee';
import {EmployeeProfileService} from '../../../services/pages/employee-profile/employee-profile.service'
import {UserService} from '../../../services/pages/user/user.service'
import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {EmployeesService} from '../../../services/pages/employees/employees.service'
// import {EmployeeFormService} from '../../../services/pages/employee-profile/employee-form.service';
import {DepartmentsService} from '../../../services/pages/settings/departments.service'
import {PositionsService} from '../../../services/pages/settings/positions.service'
import {LocationsService} from '../../../services/pages/settings/locations.service'
import {SwalService} from "../../../services/helpers/swal/swal.service";
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'employee-profile',
    templateUrl: './employee-profile.component.html',
    styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

    @Output() employeeChange = new EventEmitter<any>();
    public filter = ''
    public err_msg = '';
    public user;
    private status;
    private loader = this.swal_service.loader();
    // @Input() employee: Employee = {};
    // EmployeeForm: FormGroup;

    @Input() employee = {
        'id': null,
        'user_id': null,
        'first_name': '',
        'surname': '',
        'last_name': '',
        'department_name': '',
        'department_id': '',
        'location_id': '',
        'position_id': '',
        'position_name': '',
        'work_phone': '',
        'personal_phone': '',
        'email': '',
        'post_code': '',
        'start': '',
        'pin': '',
        'city': '',
        'country': '',
        'address': '',
        'supervisors': '',
        'salary': ''
    };
    public is_edit;
    public is_new;
    public action = 'me';
    public supervisors;
    public employees;
    public departments;
    public positions;
    public locations;
    public EmployeeForm: UntypedFormGroup;
    public parent_component: boolean = false;

    constructor(
        private employee_profile_service: EmployeeProfileService,
        private user_service: UserService,
        private injector: Injector,
        private employees_service: EmployeesService,
        private departments_service: DepartmentsService,
        private positions_service: PositionsService,
        private locations_service: LocationsService,
        private swal_service: SwalService,
        private fb: UntypedFormBuilder
    ) {
        const parent = this.injector.get(MatDialogRef, null);
        if (parent) {
            this.parent_component = true;
        }
    }

    ngOnDestroy() {
        // this.dialogRef.close([this.status, this.employee]);
    }

    ngOnInit(): void {
        if (!this.employee.id) {
            this.getEmployee();
        }
        console.log(this.employee);


        this.loader.fire();
        this.getCompanyData();


        // Добавяне на уюър //
        this.EmployeeForm = this.fb.group({
            department_id: ['', Validators.required],
            position_id: ['', Validators.required],
            location_id: ['', Validators.required],
            supervisors: [[], null],
            first_name: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]{0,14}$')]],
            last_name: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]{0,14}$')]],
            surname: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]{0,14}$')]],
            email: ['', [Validators.required, Validators.email]],
            city: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]{0,14}$')]],
            post_code: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
            address: ['', Validators.required, Validators.maxLength(50)],
            country: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]{0,14}$')]],
            pin: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            personal_phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            start: ['', Validators.required],
            work_phone: ['', Validators.pattern('^[0-9]{10}$')],
        })

        this.loader.close();
    }

    private getCompanyData() {
        forkJoin(
            this.employees_service.getEmployees(),
            this.departments_service.get(),
            this.positions_service.get(),
            this.locations_service.get()
        ).subscribe(
            ([employees, departments, positions, locations]) => {
                this.employees = employees;
                this.departments = departments;
                this.positions = positions;
                this.locations = locations;
            },
            error => {
                console.log(error);
            }
        );
    }

    public update() {
        this.loader.fire();
        const formData = this.EmployeeForm.getRawValue();
        this.employees_service.editEmployee(this.employee.id, formData).subscribe(
            result => {
                if (!result) {
                    this.swal_service.error({title: 'Грешка', titleText: result.error})
                }
                this.employee.position_name = this.positions.find(position => position.id == this.employee.position_id)['name'];
                this.employeeChange.emit(['updated', this.employee]);
                this.swal_service.success({title: 'Данните са обновени.'});
            }, error => {
                this.swal_service.error({title: 'Грешка', titleText: error.error})
            }
        )
    }

    public delete() {
        this.swal_service.confirm({titleText: 'Желате ли да премахнете ' + this.employee.first_name + ' ' + this.employee.last_name + ' от списъка със служители?'})
            .then(result => {
                if (!result.isConfirmed) {
                    return
                }
                this.loader.fire();
                this.employees_service.deleteEmployee(this.employee.id).subscribe(result => {
                    if (!result) {
                        this.swal_service.error({title: 'Грешка', titleText: 'error.error'})
                        return
                    }
                    this.user_service.delete(this.employee.user_id).subscribe(result => {
                        if (!result) {
                            this.swal_service.error({title: 'Грешка', titleText: 'Някаква грешка с Юзър'})
                            return
                        }
                        this.swal_service.success({title: 'Потребителят е премахнат.'});
                        this.employeeChange.emit(['deleted', this.employee]);
                    }, error => {
                        this.swal_service.error({title: 'Грешка', titleText: error.error})
                    })

                })
            }, error => {
                this.swal_service.error({title: 'Грешка', titleText: error.error})
            })
    }

    public getEmployee() {
        this.employees_service.getEmployee().subscribe(result => {
                if (!result) {
                    this.swal_service.error({title: 'Грешка', titleText: result.error})
                }
                this.employee = result;
            }, error => {
                console.log(error);
            }
        )
    }

    public filtering(event: Event): void {
        this.filter = String(event);
    };
}
