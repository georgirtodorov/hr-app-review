import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

// Components //
import {
    RolePermissionsDialogComponent
} from "../roles/role-permissions/role-permissions-dialog/role-permissions-dialog.component";
import {EditUserPermissionsComponent} from "./edit-user-permissions/edit-user-permissions.component";

// Services //
import {SwalService} from "../../../../services/helpers/swal/swal.service";
import {UserAccessService} from "../../../../services/pages/access/user-permissions/user-access.service";
import {enterFromBottomLeaveLeft} from "../../../../services/helpers/animations/animations.service";

// Classes //
import {UserAccessInterface} from "../../../../classes/pages/access/user/user-access.interface";
import {PermissionInterface} from "../../../../classes/pages/access/permissions/permission.interface";
import {RoleInterface} from "../../../../classes/pages/access/roles/role.interface";


@Component({
    selector: 'user-permissions',
    templateUrl: './user-permissions.component.html',
    styleUrls: ['./user-permissions.component.scss'],
    animations: [enterFromBottomLeaveLeft]
})
export class UserPermissionsComponent implements OnInit {
    @Input() users: UserAccessInterface[];
    @Input() permissions: PermissionInterface[];
    @Input() roles: RoleInterface[];

    constructor(
        private user_access_service: UserAccessService,
        private swal_service: SwalService,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
    }

    revoke(user_id: number) {
        this.swal_service.confirm({text: 'Желаете ли да премахнете правата на потребителя?'}).then(result => {
            if (!result.isConfirmed) {
                return;
            }
            this.user_access_service.revoke(user_id).subscribe(result => {
                if (!result) {
                    this.swal_service.error({text: 'Грешка'});
                    return;
                }
                this.swal_service.success({text: `Правата на ${result.first_name}  ${result.last_name} са премахнати.`});
            }, error => {
                this.swal_service.error({text: error});
            })
        })
    }

    edit(user: UserAccessInterface) {
        this.dialog.open(EditUserPermissionsComponent, {
            data: {
                user: user,
                roles: this.roles,
                permissions: this.permissions
            },
            autoFocus: false,
            disableClose: false,
            minWidth: 500
        })
    }

    public viewRole(role: RoleInterface) {
        this.dialog.open(RolePermissionsDialogComponent, {
            data: {
                role_permissions: role.permissions,
                role_name: role.name
            },
            autoFocus: false,
            disableClose: false,
            minWidth: 500
        })
    }
}
