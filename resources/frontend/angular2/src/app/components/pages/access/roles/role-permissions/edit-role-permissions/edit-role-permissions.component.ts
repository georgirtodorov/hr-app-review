import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

// Services //
import {SwalService} from "../../../../../../services/helpers/swal/swal.service";
import {RolesService} from "../../../../../../services/pages/access/roles/roles.service";
import {PermissionsService} from "../../../../../../services/pages/access/permissions/permissions.service";

// Classes //
import {PermissionInterface} from "../../../../../../classes/pages/access/permissions/permission.interface";

@Component({
    selector: 'edit-role-permissions',
    templateUrl: './edit-role-permissions.component.html',
    styleUrls: ['./edit-role-permissions.component.scss']
})
export class EditRolePermissionsComponent implements OnInit {

    @Input() permissions: PermissionInterface[];
    @Input() role_permissions: PermissionInterface[];
    @Input() role_name: string;
    private selected_permissions: PermissionInterface[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private permissions_service: PermissionsService,
        private role_service: RolesService,
        private swal_service: SwalService
    ) {
        this.permissions = data.permissions;
        this.role_permissions = data.role_permissions;
        this.role_name = data.role_name;
    }

    ngOnInit(): void {
    }

    public edit(): void {
        this.role_service.add({
            'permissions': this.selected_permissions,
            'name': this.role_name
        }).subscribe(result => {
            if (!result) {
                this.swal_service.error({text: 'Permissions were not updated'});
                return;
            }
            this.swal_service.success({text: `Permissions of ${this.role_name} were updated.`});
        }, error => {
            this.swal_service.error({text: error});
        })
    }

    changedPermissions(permissions: PermissionInterface[]): void {
        this.selected_permissions = permissions;
    }
}
