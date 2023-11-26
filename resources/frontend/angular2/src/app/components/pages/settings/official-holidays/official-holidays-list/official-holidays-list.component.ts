import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {
    OfficialHolidaysInterface
} from "../../../../../classes/pages/settings/official-holidays/official-holidays.interface";
import {OfficialHolidaysService} from "../../../../../services/pages/settings/official-holidays.service";
import {SwalService} from "../../../../../services/helpers/swal/swal.service";
import {MatDialog} from "@angular/material/dialog";
import {EditHolidayDialog} from "../add-holiday/add-holiday.component";
import {BackendError} from "../../../../../classes/error/BackendError";
import {Subscription} from "rxjs";

@Component({
  selector: 'official-holidays-list',
  templateUrl: './official-holidays-list.component.html',
  styleUrls: ['./official-holidays-list.component.scss']
})
export class OfficialHolidaysListComponent implements AfterViewInit {

    subscriptionUpdate: Subscription;

    displayedColumns: string[] = ['name', 'date', 'actions'];
    dataSource: MatTableDataSource<OfficialHolidaysInterface>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    official_holidays: OfficialHolidaysInterface[];

    constructor(
        private holidays_service: OfficialHolidaysService,
        private swal_service: SwalService,
        public dialog: MatDialog,
    ) {
        this.dataSource = new MatTableDataSource(this.official_holidays);
        this.holidays_service.get().subscribe(r => {this.official_holidays = r})
        this.subscribe();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }


    editHoliday(holiday: OfficialHolidaysInterface)
    {
        this.dialog.open(EditHolidayDialog, {
            data: {
                holiday : holiday
            },
        })
    }

    deleteHoliday(id: number)
    {
        this.holidays_service.delete(id).subscribe(r => {
            this.swal_service.success({ text: 'Записа беше премахнат' });
            this.official_holidays = this.official_holidays.filter(holiday => holiday.id !== id);
            this.updateTableData();
        }, (error: BackendError) => {
            this.swal_service.error({title: `${error.title()}`, text: `${error.message()}`});
        })
    }

    updateTableData() {
        this.holidays_service.get().subscribe(r => {this.official_holidays = r
            this.dataSource = new MatTableDataSource(this.official_holidays)})
       ;
    }

    add()
    {
        this.dialog.open(EditHolidayDialog, {
        })
    }

    private subscribe()
    {
        this.subscriptionUpdate = this.holidays_service.updateDataChange.subscribe((holiday: OfficialHolidaysInterface) => {
            const indexToUpdate = this.official_holidays.findIndex(h => h.id === holiday.id);
            if (indexToUpdate !== -1) {
                this.official_holidays[indexToUpdate] = holiday;
                this.updateTableData();
            } else {
                this.official_holidays.push(holiday);
                this.updateTableData();
            }
        });
    }
}

