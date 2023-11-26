import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

// Classes //
import {PermissionInterface} from "../../../../../../classes/pages/access/permissions/permission.interface";

@Component({
    selector: 'role-permissions-dialog',
    templateUrl: './role-permissions-dialog.component.html',
    styleUrls: ['./role-permissions-dialog.component.scss']
})
export class RolePermissionsDialogComponent implements OnInit {
    public role_permissions: PermissionInterface[];
    public role_name: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.role_permissions = data.role_permissions;
        this.role_name = data.role_name;
    }

    ngOnInit(): void {
    }

}
