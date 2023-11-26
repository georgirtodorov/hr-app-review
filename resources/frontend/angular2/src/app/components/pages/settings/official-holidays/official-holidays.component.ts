import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {
    OfficialHolidaysInterface
} from "../../../../classes/pages/settings/official-holidays/official-holidays.interface";
import {EditHolidayDialog} from "./add-holiday/add-holiday.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'official-holidays',
    templateUrl: './official-holidays.component.html',
    styleUrls: ['../settings.component.scss', './official-holidays.component.scss']
})
export class OfficialHolidaysComponent implements OnInit
{
    @ViewChild(MatAccordion) accordion: MatAccordion;


    constructor(
        public dialog: MatDialog,
    )
    {
    }

    ngOnInit(): void
    {
    }
}
