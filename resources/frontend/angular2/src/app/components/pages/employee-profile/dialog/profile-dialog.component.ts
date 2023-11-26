import {Component, Inject, Output, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'profile-dialog',
    template:   '<mat-dialog-content>' +
                    '<employee-profile [employee]="employee" (employeeChange)="onEmployeeChange($event)"></employee-profile>' +
                '</mat-dialog-content>'
})
export class ProfileDialogComponent implements OnInit {

    @Output() employee;
    private action

    constructor(
        private dialogRef: MatDialogRef<ProfileDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
    ) {
    }

    ngOnDestroy() {
        this.dialogRef.close([this.action, this.employee]);
    }

    ngOnInit(): void {
        this.employee = this.data.employee;
    }

    onEmployeeChange(employeeChange) {
        [this.action, this.employee] = employeeChange;
        if (this.action === 'deleted') {
            this.ngOnDestroy();
        }
    }

}
