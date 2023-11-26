import {Component, OnInit, Input, Output, EventEmitter, Injector} from '@angular/core';
import {UserService} from '../../../services/pages/user/user.service';
import {EmployeeProfileService} from '../../../services/pages/employee-profile/employee-profile.service';
import {SwalService} from '../../../services/helpers/swal/swal.service';
import {UntypedFormGroup, UntypedFormBuilder} from '@angular/forms';
import {ProfileDataForm} from '../../../classes/pages/profile/profile-data/profile-data-form';
import {ProfileData} from '../../../classes/pages/profile/profile-data/profile-data.interface';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ChangePasswordDialog} from "../password/change-password/change-password.component";
import {ForceChangePasswordDialog} from "../password/force-change/force-change-password.component";
import {UserPermissionsService} from "../../../services/helpers/permissions/user-permissions.service";
import {EmployeesService} from "../../../services/pages/employees/employees.service";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    @Input() public employee;
    @Input() public absences;
    @Output() public profileChange = new EventEmitter<any>();
    //Check if it's current user or other employee
    public me: boolean = false;
    public canViewSalary: boolean = false;

    get getProfileDataForm() {
        return this.form.get('profile_data') as UntypedFormGroup
    }

    get getAbsenceRequestForm() {
        return this.form.get('absence_request') as UntypedFormGroup
    }

    form: UntypedFormGroup
    profileDataForm: ProfileDataForm<ProfileData>;
    public parent_component: boolean = false;
    public canForceChangePassword: boolean = false;

    constructor(
        private user_service: UserService,
        private employee_profile_service: EmployeeProfileService,
        private swal_service: SwalService,
        private fb: UntypedFormBuilder,
        private injector: Injector,
        public dialog: MatDialog,
        private user_permissions: UserPermissionsService,
        private employees_service: EmployeesService
    ) {
        const parent = this.injector.get(MatDialogRef, null);
        if (parent) {
            this.parent_component = true;
        }
        this.profileDataForm = new ProfileDataForm<ProfileData>(fb);
        this.form = new UntypedFormGroup({
            profile_data: this.profileDataForm.formGroup
        });
    }

    ngOnInit(): void {
        if (!this.employee) {
            this.getEmployee();
            console.log(this.employee)
        }
        console.log(this.absences);

        this.user_permissions.hasPermission('can_force_change_password').subscribe(hasPermission => {
            this.canForceChangePassword = hasPermission;
        }, error => {
            console.log(error)
        });

        this.user_permissions.hasPermission('can_view_salary').subscribe(hasPermission => {
            this.canViewSalary = hasPermission;
        }, error => {
            console.log(error)
        });
    }

    public getProfile() {

    }


    public getEmployee() {
        this.employees_service.getEmployee().subscribe(result => {
                if (!result) {
                    this.swal_service.error({title: 'Грешка', titleText: result.error})
                }
                this.employee = result;
            }, error => {
                this.swal_service.error({title: `${error.title()}`, text: `Служителя не е намерен: ${error.message()}`});
            }
        )
    }


    public onProfileUpdated(employee) {
        this.profileChange.emit(employee);
    }

    changePassword()
    {
        this.dialog.open(ChangePasswordDialog, {
            data: {
            },
            // autoFocus: false,
            // disableClose: false,
            // minWidth: 500
        })
    }

    forcePasswordChange()
    {
        this.dialog.open(ForceChangePasswordDialog, {
            data: {
                user_id : this.employee.user_id
            },
            // autoFocus: false,
            // disableClose: false,
            // minWidth: 500
        })
    }
}
