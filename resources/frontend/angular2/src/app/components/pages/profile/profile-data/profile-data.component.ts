import {Component, OnInit, Input, ElementRef } from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {SwalService} from '../../../../services/helpers/swal/swal.service';
import {CompanyDataService} from '../../../../services/helpers/company-data/company-data.service';

import {UserService} from '../../../../services/pages/user/user.service';
import {EmployeeProfileService} from '../../../../services/pages/employee-profile/employee-profile.service';
import {EmployeesService} from "../../../../services/pages/employees/employees.service";


@Component({
    selector: 'profile-data',
    templateUrl: './profile-data.component.html',
    styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit {

    @Input() public employee;
    @Input() public getEmployee;
    @Input() public isDisabled: boolean = false;
    @Input() form: UntypedFormGroup;

    get profileDataForm()
    {
        return this.form.get('profile_data') as UntypedFormGroup;
    }



    public filter = {
        first_name: '',
        last_name: '',
        department_name: '',
        position_name: '',
        location_city: ''
    };

    public employees = [];
    public departments = [];
    public positions = [];
    public locations = [];
    public loading = true;


    constructor(
        private user_service: UserService,
        private employees_service: EmployeesService,
        private swal_service: SwalService,
        private company_data_service: CompanyDataService,
        private el: ElementRef
    ) {
        this.getCompanyData();
    }

    getCompanyData() {
        this.company_data_service.getCompanyData().subscribe(result => {
            if (!result) {
                //error
            }
            this.employees = result.employees;
            this.departments = result.departments;
            this.positions = result.positions;
            this.locations = result.locations;
            this.swal_service.loader().close();
        }, error => {
            //some error
        });
    }


    ngOnInit(): void {
        if (!this.employee) {
            this.getCurrentUser()
        } else {
            this.setForm(this.employee)
        }
    }

    ngAfterViewInit(): void {
         this.setForm(this.employee);
    }

    private setForm(employee) {
        if (!employee) {
            return
        }
        this.profileDataForm.markAllAsTouched();
        this.profileDataForm.patchValue({
            id: employee.id,
            user_id: this.employee.user_id,
            department_id: employee.department_id,
            position_id: employee.position_id,
            location_id: employee.location_id,
            supervisors: employee.supervisors,
            first_name: employee.first_name,
            last_name: employee.last_name,
            surname: employee.surname,
            email: employee.email,
            city: employee.city,
            post_code: employee.post_code,
            address: employee.address,
            country: employee.country,
            pin: employee.pin,
            personal_phone: employee.personal_phone,
            start: employee.start,
            work_phone: employee?.work_phone ?? ''
        });
        if (this.isDisabled) {
            this.profileDataForm.disable();
        }
    }

    public getCurrentUser() {
        this.employees_service.getEmployee().subscribe(res => {
                if (!res) {
                    this.swal_service.error({title: 'Грешка', titleText: res.error})
                }
                this.employee = res;
                this.setForm(res);
            }
        )
    }

    public filtering(event: Event,key: string): void {
        this.filter[key] = String(event);
    };

    public destroySearch (key: ElementRef) {
        console.log(key)

        console.log(key.nativeElement);
        console.log(this.el.nativeElement(key));
        console.log(this.el.nativeElement.querySelector('#department_name'));
        console.log(this.el.nativeElement);
    }

}
