import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';


import {MatTableDataSource} from "@angular/material/table";
import {AbsencesService} from "../../../services/pages/absences/absences.service";
// import {UserService} from '../../../services/pages/user/user.service';
// import {EmployeeProfileService} from '../../../services/pages/employee-profile/employee-profile.service';
// import {SwalService} from '../../../services/helpers/swal/swal.service';
// import {FormGroup, FormBuilder} from '@angular/forms';
// import {ProfileDataForm} from '../../../classes/pages/profile/profile-data/profile-data-form';
// import {ProfileData} from '../../../classes/pages/profile/profile-data/profile-data.interface';
// import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'absence',
    templateUrl: './absence.component.html',
    styleUrls: ['./absence.component.scss']
})
export class AbsenceComponent implements OnInit {

    @ViewChild(MatAccordion) accordion: MatAccordion;

    @Input() public list
    @Input() public archive
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

    }

    public getPending() {
        this.absences_service.getPending().subscribe(result => {
            console.log(result)
        })
    }
}
