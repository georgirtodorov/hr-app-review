import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

// Services //
import {SwalService} from "../../../services/helpers/swal/swal.service";
import {PermissionsService} from "../../../services/pages/access/permissions/permissions.service";
import {RolesService} from "../../../services/pages/access/roles/roles.service";
import {UserAccessService} from "../../../services/pages/access/user-permissions/user-access.service";

// Classes //
import {PermissionInterface} from "../../../classes/pages/access/permissions/permission.interface";
import {RoleInterface} from "../../../classes/pages/access/roles/role.interface";
import {UserAccessInterface} from "../../../classes/pages/access/user/user-access.interface";
import {UserPermissionsService} from "../../../services/helpers/permissions/user-permissions.service";

@Component({
    selector: 'access',
    templateUrl: './access.component.html',
    styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {
    public permissions: PermissionInterface[];
    public roles: RoleInterface[];
    public users: UserAccessInterface[];
    private permission_subscription: Subscription;
    private role_subscription: Subscription;
    private user_subscription: Subscription;

    constructor(
        private permissions_service: PermissionsService,
        private roles_service: RolesService,
        private user_access_service: UserAccessService,
        private swal_service: SwalService
    ) {
    }


    ngOnDestroy(): void {
        this.permission_subscription.unsubscribe();
        this.role_subscription.unsubscribe();
        this.user_subscription.unsubscribe();
    }

    ngOnInit(): void {
        this.getData();
        this.subscribe();
    }

    private getData(): void {
        this.getPermissions();
        this.getRoles();
        this.getUsers();
    }

    private getPermissions(): void {
        this.permissions_service.get().subscribe(result => {
            if (!result) {
                return;
            }
            this.permissions = result;
        }, error => {
            this.swal_service.error({text: error});
        })
    }

    private getRoles(): void {

        this.roles_service.get().subscribe((result: any) => {
            if (!result) {
                return;
            }
            this.roles = result;
        }, error => {
            this.swal_service.error({text: error});
        })
    }

    private getUsers(): void {
        this.user_access_service.get().subscribe(result => {
            if (!result) {
                return;
            }
            this.users = result;
        }, error => {
            this.swal_service.error({text: error});
        })
    }

    private subscribe(): void {
        this.permissionSubscribe();
        this.roleSubscribe();
        this.userSubscribe();
    }

    private permissionSubscribe(): void {
        this.permission_subscription = this.permissions_service.permissionChange.subscribe((request: any) => {
            this.getUsers();
            this.getRoles();
            this.updateData(this.permissions, request);
        });
    }

    private roleSubscribe(): void {
        this.role_subscription = this.roles_service.roleChange.subscribe((request: any) => {
            this.getUsers();
            this.updateData(this.roles, request);
        });
    }

    private userSubscribe() {
        this.user_subscription = this.user_access_service.userChange.subscribe((request: UserAccessInterface) => {
            this.getRoles();
            this.updateData(this.users, request);
        });
    }

    private updateData(access_data: UserAccessInterface[] | PermissionInterface[] | RoleInterface[], request: any): void {
        const index = access_data.findIndex(d => d.id === request.id);
        if (index == -1) {
            access_data.push(request);
            return;
        }
        if (request?.delete) {
            access_data.splice(index, 1);
            return;
        }
        access_data[index] = request;
    }
}
