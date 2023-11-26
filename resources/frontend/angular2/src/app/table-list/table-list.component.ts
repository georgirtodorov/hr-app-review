import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }


    ngOnInit() {
    }



}
