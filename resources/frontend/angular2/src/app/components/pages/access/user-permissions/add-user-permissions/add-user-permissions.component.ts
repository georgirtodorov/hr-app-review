import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, FormGroupDirective} from "@angular/forms";

// Services //
import {SwalService} from "../../../../../services/helpers/swal/swal.service";
import {UserAccessService} from "../../../../../services/pages/access/user-permissions/user-access.service";

// Classes //
import {UserAccessForm} from "../../../../../classes/pages/access/user/user-access-form";
import {PermissionInterface} from "../../../../../classes/pages/access/permissions/permission.interface";
import {RoleInterface} from "../../../../../classes/pages/access/roles/role.interface";
import {UserAccessInterface} from "../../../../../classes/pages/access/user/user-access.interface";

@Component({
    selector: 'add-user-permissions',
    templateUrl: './add-user-permissions.component.html',
    styleUrls: ['./add-user-permissions.component.scss']
})
export class AddUserPermissionsComponent implements OnInit {
    @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

    @Input() users: UserAccessInterface[];
    @Input() permissions: PermissionInterface[];
    @Input() roles: RoleInterface[];
    public user: UserAccessForm<UserAccessInterface>;

    constructor(
        private fb: UntypedFormBuilder,
        private user_access_service: UserAccessService,
        private swal_service: SwalService,
    ) {
        this.user = new UserAccessForm(fb)
    }

    ngOnInit(): void {
    }

    add() {
        if (!this.user.formGroup.valid) {
            this.user.formGroup.markAllAsTouched();
            return;
        }
        this.user_access_service.add(this.user.formGroup.getRawValue()).subscribe(result => {
            if (!result) {
                this.swal_service.error({text: 'Error'});
                return;
            }
            setTimeout(() => this.formGroupDirective.resetForm(), 200);
            this.swal_service.success({
                text: `Access scope for ${result.first_name} ${result.last_name} was added.`
            });
        }, error => {
            this.swal_service.error({text: error});
        })
    }

}
