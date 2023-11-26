import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'profile-dialog',
    template: '<mat-dialog-content>' +
        '<profile [employee]="employee" [absences]="absences" (profileChange)="onProfileUpdated($event)"></profile>' +
        '</mat-dialog-content>'
})
export class ProfileDialogComponent implements OnInit {

    public employee
    public absences

    constructor(
        private dialogRef: MatDialogRef<ProfileDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
    }

    ngOnDestroy() {
        this.dialogRef.close(this.employee);
    }

    ngOnInit(): void {
        this.employee = this.data.employee;
        this.absences = this.data.absences;
        console.log(this.data)
    }

    onProfileUpdated(profileChange) {
        this.employee = profileChange;
    }
}
