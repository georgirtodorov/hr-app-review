import {Component, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {UserRegister} from "../../../../classes/pages/user/user-register-interface";

@Component({
    selector: 'register-dialog',
    template:
        '<mat-dialog-content>' +
        '<register (userRegistered)="onUserRegistered($event)"></register>' +
        '</mat-dialog-content>'
})
export class RegisterDialogComponent {

    @Output() user;

    constructor(
        private dialogRef: MatDialogRef<RegisterDialogComponent>
    ) {
    }

    onUserRegistered(user: UserRegister) {
        this.dialogRef.close(user);
    }
}
