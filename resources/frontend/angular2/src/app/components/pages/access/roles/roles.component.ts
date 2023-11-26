import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

// Components //
import {EditRolePermissionsComponent} from "./role-permissions/edit-role-permissions/edit-role-permissions.component";
import {EditRoleUsersComponent} from "./role-users/edit-role-users/edit-role-users.component";

// Services //
import {SwalService} from "../../../../services/helpers/swal/swal.service";
import {RolesService} from "../../../../services/pages/access/roles/roles.service";
import {
    enterFromBottomLeaveLeft, resizeAndOpacity
} from "../../../../services/helpers/animations/animations.service";

// Classes //
import {RoleInterface} from "../../../../classes/pages/access/roles/role.interface";
import {PermissionInterface} from "../../../../classes/pages/access/permissions/permission.interface";
import {User} from "../../../../classes/pages/user/user.interface";

@Component({
    selector: 'roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
    animations: [enterFromBottomLeaveLeft, resizeAndOpacity]
})
export class RolesComponent implements OnInit {
    @Input() permissions: PermissionInterface[];
    @Input() roles: RoleInterface[] = [];
    @Input() users: User[];

    public visible_role_permissions = Array(this.roles.length).fill(false);
    public visible_role_users = Array(this.roles.length).fill(false);

    constructor(
        private roles_service: RolesService,
        private swal_service: SwalService,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
    }

    public delete(role: RoleInterface): void {
        this.swal_service.confirm({text: 'Желаете ли да изтриете записа?'}).then(result => {
            if (!result.isConfirmed) {
                return;
            }
            this.roles_service.delete(role.id).subscribe(result => {
                if (!result) {
                    this.swal_service.error({text: 'Грешка'});
                    return;
                }
                this.swal_service.success({text: `Permission ${role.name} deleted.`})
            }, error => {
                this.swal_service.error({text: error});
            })
        })
    }

    toggleRolePermissions(index: number): void {
        this.visible_role_permissions[index] = !this.visible_role_permissions[index];
    }

    public editRolePermissions(role: RoleInterface): void {
        this.dialog.open(EditRolePermissionsComponent, {
            data: {
                role_permissions: role.permissions,
                permissions: this.permissions,
                role_name: role.name
            },
            autoFocus: false,
            disableClose: false,
            minWidth: 500
        })
    }

    toggleRoleUsers(index: number): void {
        this.visible_role_users[index] = !this.visible_role_users[index];
    }

    public editRoleUsers(role: RoleInterface): void {
        this.dialog.open(EditRoleUsersComponent, {
            data: {
                role_users: role.users,
                users: this.users,
                role_name: role.name
            },
            autoFocus: false,
            disableClose: false,
            minWidth: 500
        })
    }
}

