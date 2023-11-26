import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

// Services //
import {SwalService} from "../../../../../../services/helpers/swal/swal.service";
import {RolesService} from "../../../../../../services/pages/access/roles/roles.service";

// Classes //
import {User} from "../../../../../../classes/pages/user/user.interface";

@Component({
    selector: 'edit-role-users',
    templateUrl: './edit-role-users.component.html',
    styleUrls: ['./edit-role-users.component.scss']
})
export class EditRoleUsersComponent implements OnInit {
    private selected_users: User[]
    public users: User[];
    public role_users: User[];
    public role_name: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private role_service: RolesService,
        private swal_service: SwalService
    ) {
        this.users = data.users;
        this.role_name = data.role_name;
        this.role_users = data.role_users
    }

    ngOnInit(): void {
    }

    public edit(): void {
        this.role_service.roleUsers(
            this.role_name,
            this.selected_users
        ).subscribe((result: boolean) => {
            if (!result) {
                this.swal_service.error({text: 'Users of role were not updated'});
                return;
            }
            this.swal_service.success({text: `Users of ${this.role_name} were updated.`})
        }, error => {
            this.swal_service.error({text: error});
        })
    }

    changedUsers(users: User[]): void {
        this.selected_users = users;
    }
}
