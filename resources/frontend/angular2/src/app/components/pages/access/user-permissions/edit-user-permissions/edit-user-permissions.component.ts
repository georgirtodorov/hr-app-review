import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UntypedFormBuilder} from "@angular/forms";

// Services //
import {SwalService} from "../../../../../services/helpers/swal/swal.service";
import {UserAccessService} from "../../../../../services/pages/access/user-permissions/user-access.service";

// Classes //
import {UserAccessInterface} from "../../../../../classes/pages/access/user/user-access.interface";
import {PermissionInterface} from "../../../../../classes/pages/access/permissions/permission.interface";
import {RoleInterface} from "../../../../../classes/pages/access/roles/role.interface";
import {UserAccessForm} from "../../../../../classes/pages/access/user/user-access-form";


@Component({
    selector: 'edit-user-permissions',
    templateUrl: './edit-user-permissions.component.html',
    styleUrls: ['./edit-user-permissions.component.scss']
})
export class EditUserPermissionsComponent implements OnInit {
    public user: UserAccessForm<UserAccessInterface>;
    public roles: RoleInterface[];
    public permissions: PermissionInterface[];

    public roleComparison = function (option, value): boolean {
        return option.id === value?.id;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private user_access_service: UserAccessService,
        private swal_service: SwalService,
        private fb: UntypedFormBuilder,
    ) {
        this.user = new UserAccessForm<UserAccessInterface>(fb);
        this.roles = data.roles;
        this.permissions = data.permissions;
    }

    ngOnInit(): void {
        this.initUserAccessForm()
    }

    edit(): void {
        this.user_access_service.add(this.user.formGroup.getRawValue()).subscribe(result => {
            if (!result) {
                this.swal_service.error({text: 'Грешка'});
                return;
            }
            this.swal_service.success(
                {
                    text: `Access scope of ${this.data.user.first_name} ${this.data.user.last_name} was updated.`
                }
            );
        }, error => {
            this.swal_service.error({text: error});
        })
    }

    changedPermissions(permissions: PermissionInterface[]) {
        this.user.formGroup.patchValue({
            permissions: permissions
        })
    }

    private initUserAccessForm() {
        this.user.formGroup.patchValue({
            id: this.data.user.id,
            first_name: this.data.user.first_name,
            last_name: this.data.user.last_name,
            email: this.data.user.email,
            roles: this.data.user.roles,
            permissions: this.data.user.permissions
        })
    }
}
