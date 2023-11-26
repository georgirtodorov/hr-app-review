import {Component, OnInit, Input, ViewChild, SimpleChanges} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatTableDataSource} from "@angular/material/table";
import {AbsencesService} from "../../../../services/pages/absences/absences.service";
// import {UserService} from '../../../services/pages/user/user.service';
// import {EmployeeProfileService} from '../../../services/pages/employee-profile/employee-profile.service';
// import {SwalService} from '../../../services/helpers/swal/swal.service';
// import {FormGroup, FormBuilder} from '@angular/forms';
// import {ProfileDataForm} from '../../../classes/pages/profile/profile-data/profile-data-form';
// import {ProfileData} from '../../../classes/pages/profile/profile-data/profile-data.interface';
// import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'profile-absence',
    templateUrl: './profile-absence.component.html',
    styleUrls: ['./profile-absence.component.scss']
})
export class ProfileAbsenceComponent implements OnInit {

    @ViewChild(MatAccordion) accordion: MatAccordion;

    @Input() public list
    @Input() public archive
    @Input() public isDisabled
    @Input() public employee
    // @Output() public profileChange = new EventEmitter<any>();
    //
    // get getProfileDataForm() {
    //     return this.form.get('profile_data') as FormGroup
    // }
    //
    // form: FormGroup
    // profileDataForm: ProfileDataForm<ProfileData>;
    // public parent_component: boolean = false;

    constructor(
        private absences_service: AbsencesService,
        // private user_service: UserService,
        // private employee_profile_service: EmployeeProfileService,
        // private swal_service: SwalService,
        // private fb: FormBuilder,
        // private injector: Injector,
    ) {
        // const parent = this.injector.get(MatDialogRef, null);
        // if (parent) {
        //     this.parent_component = true;
        // }
        // this.profileDataForm = new ProfileDataForm<ProfileData>(fb);
        // this.form = new FormGroup({
        //     profile_data: this.profileDataForm.formGroup
        // });
    }

    ngOnInit(): void {
    //     if (!this.employee) {
    //         this.getEmployee();
    //         console.log(this.employee)
    //     }
    //     console.log(this.absences);
    // }
    //
    // public getProfile() {
        if (!this.list) {
            this.get();
        }

    }

    ngOnChanges(changes: SimpleChanges): void
    {
        // Handle changes to the employee input
        if (changes.employee) {
            this.get();
        }
    }

    public onRequestCreated(new_requst){
        console.log('new request:');
        console.log(new_requst);
        this.list.push(new_requst)
        return

        this.list.push(new_requst)
        console.log('new request:')
        console.log(new_requst)
    }

    private get(): void {
        this.absences_service.getForEmployee(this.employee?.id).subscribe(
            result => {
                this.list = result;
            }
        )
    }

    // public getEmployee() {
    //     if (this.employee) {
    //         return this.employee;
    //     }
    //     this.user_service.getCurrentUser().subscribe(result => {
    //             if (!result) {
    //                 this.swal_service.error({title: 'Грешка', titleText: result.error})
    //             }
    //             this.employee_profile_service.getEmployee(result['id']).subscribe(res => {
    //                     if (!res) {
    //                         this.swal_service.error({title: 'Грешка', titleText: res.error})
    //                     }
    //                     this.employee = res;
    //                     console.log(this.employee)
    //                 }
    //             )
    //         }, error => {
    //             console.log(error);
    //         }
    //     )
    // }
    //
    //
    // public onProfileUpdated(employee) {
    //     this.profileChange.emit(employee);
    // }

}
