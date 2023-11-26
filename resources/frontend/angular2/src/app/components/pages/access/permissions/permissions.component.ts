import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

// Components //
import {EditPermissionComponent} from "./edit-permission/edit-permission.component";

// Services //
import {SwalService} from "../../../../services/helpers/swal/swal.service";
import {PermissionsService} from "../../../../services/pages/access/permissions/permissions.service";
import {UserPermissionsService} from "../../../../services/helpers/permissions/user-permissions.service";
import {enterFromBottomLeaveLeft} from "../../../../services/helpers/animations/animations.service";

// Classes //
import {PermissionInterface} from "../../../../classes/pages/access/permissions/permission.interface";

@Component({
    selector: 'permissions',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.scss'],
    animations: [enterFromBottomLeaveLeft]
})
export class PermissionsComponent implements OnInit {
    @Input() permissions: PermissionInterface[] = [];

    public canEdit: boolean = false;

    constructor(
        private permissions_service: PermissionsService,
        private user_permissions: UserPermissionsService,
        private dialog: MatDialog,
        private swal_service: SwalService
    ) {
        this.user_permissions.hasPermission('can_manage_permissions').subscribe(hasPermission => {
            this.canEdit = hasPermission;
        }, error => {
            this.swal_service.error({text: error});
        });
    }

    ngOnInit(): void {
    }

    public delete(permission: PermissionInterface): void {
        this.swal_service.confirm({text: 'Желаете ли да изтриете записа?'}).then(result => {
            if (!result.isConfirmed) {
                return;
            }
            this.permissions_service.delete(permission.id).subscribe(result => {
                if (!result) {
                    this.swal_service.error({text: 'Грешка'});
                    return;
                }
                this.swal_service.success({text: `Permission ${permission.name} deleted.`})
            }, error => {
                this.swal_service.error({text: error});
            })
        })
    }

    public edit(permission: PermissionInterface): void {
        this.dialog.open(EditPermissionComponent, {
            data: {
                permission: permission
            },
            autoFocus: false,
            disableClose: false,
            minWidth: 500
        })
    }
}
