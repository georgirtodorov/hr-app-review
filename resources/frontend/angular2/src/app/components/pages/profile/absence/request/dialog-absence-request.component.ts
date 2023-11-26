import {Component, Inject, OnInit} from '@angular/core';

import {
    AbsenceRequestInterface,
} from '../../../../../classes/pages/profile/absence/request/absence-request.interface';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'dialog-profile-absence-request',
    template: '<mat-dialog-content>' +
        '<profile-absence-request [request]="request"></profile-absence-request>' +
        '</mat-dialog-content>',
    styleUrls: ['./profile-absence-request.component.scss']
})
export class DialogAbsenceRequestComponent implements OnInit {

    public request: AbsenceRequestInterface






    constructor(
        @Inject(MAT_DIALOG_DATA) public data
    ) {

    }

    ngOnInit(): void {
        this.request = this.data.request;
    }


}

