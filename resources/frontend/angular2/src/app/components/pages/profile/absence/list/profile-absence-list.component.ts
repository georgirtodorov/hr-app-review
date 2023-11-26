import {Component, OnInit, Input, ViewChild, SimpleChanges} from '@angular/core';
import {AbsenceTypesService} from '../../../../../services/pages/settings/absence-types.service'
import {AbsencesService} from '../../../../../services/pages/absences/absences.service'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
    selector: 'profile-absence-list',
    templateUrl: './profile-absence-list.component.html',
    styleUrls: ['./profile-absence-list.component.scss']
})
export class ProfileAbsenceListComponent implements OnInit {
    displayedColumns: string[] = ['start_date', 'end_date', 'days', 'type_name', 'approval'];
    absence_requests: MatTableDataSource<any>;

    @Input() public requests
    @Input() public archieve



    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private absence_types_service: AbsenceTypesService,
        private absences_service: AbsencesService,
    ) {
        this.absence_requests = new MatTableDataSource(this.requests);
    }

    ngAfterViewInit() {
        this.absence_requests.paginator = this.paginator;
        this.absence_requests.sort = this.sort;
    }

    ngOnInit(): void {
        console.log(this.requests);
        console.log(this.archieve);


        console.log(this.absence_requests)
        if (!this.requests) {
            this.get();
        }
    }

    private get(): void {
        this.absences_service.getForEmployee(2).subscribe(
            result => {
                this.absence_requests = result;
                console.log(result);
                this.absence_requests = new MatTableDataSource(result);
                this.absence_requests.paginator = this.paginator;
                this.absence_requests.sort = this.sort;
            }
        )
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.absence_requests.filter = filterValue.trim().toLowerCase();

        if (this.absence_requests.paginator) {
            this.absence_requests.paginator.firstPage();
        }
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        // Handle changes to the employee_id input
        if (changes.requests) {
            this.absence_requests = new MatTableDataSource(this.requests);
            this.absence_requests.paginator = this.paginator;
            this.absence_requests.sort = this.sort;
        }
    }

    public humanizedStatus(status) {
        switch (status) {
            case 'WAITING':
                return 'Очаква потвърждение.';
            default:
                return 'Получена';
        }
    }

}
