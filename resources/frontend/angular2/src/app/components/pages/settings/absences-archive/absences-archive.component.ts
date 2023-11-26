import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common'
import {MatExpansionModule} from '@angular/material/expansion';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


import {MatAccordion} from '@angular/material/expansion';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup, FormBuilder, Validators, FormControl, FormsModule} from '@angular/forms';
import {EmployeesService} from '../../../../services/pages/employees/employees.service';
import {AbsenceTypesService} from '../../../../services/pages/settings/absence-types.service';
import {AbsencesArchiveService} from '../../../../services/pages/settings/absences-archive.service';
import {AbsencesService} from '../../../../services/pages/absences/absences.service'
import {Employee} from '../../../../classes/pages/Employee'
import {SwalService} from "../../../../services/helpers/swal/swal.service";
import {AbsencesArchiveRegisterComponent} from '../../../../components/pages/settings/absences-archive/archive-register/archive-register.component'

export interface AbsenceArchive {
    first_name: string;
    last_name: string;
    position: string;
    department: string;
    location: string;
    name: string;
    due_date: string;
    days: string;
}

@Component({
    selector: 'absences-archive',
    templateUrl: './absences-archive.component.html',
    styleUrls: ['./absences-archive.component.scss']
})
export class AbsencesArchiveComponent implements AfterViewInit {
    @ViewChild(MatAccordion) accordion: MatAccordion;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public loading = true;


    public employees: Array<Employee> = [];

    public displayedColumns: string[] = ['first_name', 'last_name', 'position', 'department', 'location', 'name', 'due_date', 'days'];
    public absence_archive: MatTableDataSource<AbsenceArchive>;
    public absence_types = [];
    public absence = {
        'type': '',
        'employee_id': '',
        'days': ''
    }





    constructor(
        private employees_service: EmployeesService,
        private absence_types_service: AbsenceTypesService,
        private absences_service: AbsencesService,
        private absences_archive_service: AbsencesArchiveService,
        public datepipe: DatePipe,
        private swal_service: SwalService,
        private dialog: MatDialog,
    ) {
    }

    ngAfterViewInit(): void {
        this.getArchive();
        this.getAbsenceTypes();
        this.getEmployees();
        this.loading = false;
    }

    private getArchive(): void {
        this.absences_archive_service.get().subscribe(result => {

           this.absence_archive = new MatTableDataSource(result);
           this.absence_archive.paginator = this.paginator;
           this.absence_archive.sort  = this.sort;

           console.log(result);
        })
    }

    private applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.absence_archive.filter = filterValue.trim().toLowerCase();

        if (this.absence_archive.paginator) {
            this.absence_archive.paginator.firstPage();
        }
    }


    private getEmployees(): void {
        this.employees_service.getEmployees().subscribe(result => {
            this.employees = result;
        })
    }

    private getAbsenceTypes(): void {
        this.absence_types_service.get().subscribe(result => {
            this.absence_types = result;
        })
    }

    public add(): void {
        let dialogRef = this.dialog.open(AbsencesArchiveRegisterComponent, {
            data: {},
            autoFocus: false,
            disableClose: false
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result && result != 'cancel') {
            }
        })
    }



}
