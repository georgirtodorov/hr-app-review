import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

// Classes //
import {User} from "../../../../../classes/pages/user/user.interface";

@Component({
    selector: 'role-users',
    templateUrl: './role-users.component.html',
    styleUrls: ['./role-users.component.scss']
})
export class RoleUsersComponent implements OnInit {

    @Output() selectedUsersEvent = new EventEmitter<User[]>();
    @Input() users: User[]
    @Input() role_users: User[]
    @Input() readonly: boolean = false;
    private selected_users: User[] = [];

    constructor() {
    }

    ngOnInit(): void {
        this.role_users.forEach(user => this.selected_users.push(user));
    }

    selectedUsers(): void {
        this.selectedUsersEvent.emit(this.selected_users);
    }

    isChecked(user: any): boolean {
        if (!this.selected_users) {
            return;
        }
        return this.selected_users.some(u => u.id === user.id);
    }

    onCheckboxChange(event, user: User): void {
        if (event.checked) {
            this.selected_users.push(user);
        } else {
            const index = this.selected_users.findIndex(p => p.id === user.id);
            if (index >= 0) {
                this.selected_users.splice(index, 1);
            }
        }
        this.selectedUsers();
    }
}
