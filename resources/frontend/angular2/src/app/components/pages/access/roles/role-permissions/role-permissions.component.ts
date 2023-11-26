import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';

// Classes //
import {PermissionInterface} from "../../../../../classes/pages/access/permissions/permission.interface";

@Component({
    selector: 'role-permissions',
    templateUrl: './role-permissions.component.html',
    styleUrls: ['./role-permissions.component.scss']
})
export class RolePermissionsComponent implements OnInit {
    @Output() selectedPermissionsEvent = new EventEmitter<PermissionInterface[]>();
    @Input() permissions: PermissionInterface[];
    @Input() role_permissions: PermissionInterface[];
    @Input() readonly: boolean = false;
    private selected_permissions: PermissionInterface[] = [];
    tooltipPositionClass = 'above left';
    constructor() {
    }

    ngOnInit(): void {
        this.role_permissions.forEach(permission => this.selected_permissions.push(permission));
    }

    selectedPermissions(permissions: PermissionInterface[]): void {
        this.selectedPermissionsEvent.emit(permissions);
    }

    isChecked(permission: PermissionInterface): boolean {
        if (!this.selected_permissions) {
            return;
        }
        return this.selected_permissions.some(p => p.id === permission.id);
    }

    onCheckboxChange(event: any, permission: PermissionInterface): void {
        if (event.checked) {
            // add the permission to the selectedPermissions array
            this.selected_permissions.push(permission);
        } else {
            // remove the permission from the selectedPermissions array
            const index = this.selected_permissions.findIndex(p => p.id === permission.id);
            if (index >= 0) {
                this.selected_permissions.splice(index, 1);
            }
        }
        this.selectedPermissions(this.selected_permissions);
    }
}
