import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {SwalService} from '../../../../services/helpers/swal/swal.service';
import {EmployeesService} from '../../../../services/pages/employees/employees.service'
import {ProfileData} from '../../../../classes/pages/profile/profile-data/profile-data.interface';


@Component({
    selector: 'profile-actions',
    templateUrl: './profile-actions.component.html',
    styleUrls: ['./profile-actions.component.scss']
})
export class ProfileActionsComponent implements OnInit {

    @Input() form: UntypedFormGroup;
    @Output() profileUpdated = new EventEmitter<ProfileData>();

    get profileDataForm() {
        return this.form.get('profile_data') as UntypedFormGroup;
    }


    constructor(
        private employees_service: EmployeesService,
        private swal_service: SwalService
    ) {
    }

    ngOnInit(): void {
    }

    public update() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            return
        }
        this.swal_service.loader().fire();
        let profile_data = this.profileDataForm.getRawValue();
        this.employees_service.edit(profile_data.id, profile_data).subscribe(
            result => {
                if (!result) {
                    this.swal_service.error({title: 'Грешка', titleText: result.error});
                }
                this.profileUpdated.emit(result);
                this.swal_service.success({title: 'Данните са обновени.'});
            }, error => {
                this.swal_service.error({title: 'Грешка', titleText: error.error});
            }
        )
    }
}
