import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AbsenceTypesService} from "../../../../services/pages/settings/absence-types.service";
import {AbsencesService} from "../../../../services/pages/absences/absences.service";


//testing shared service //
import {Subscription} from 'rxjs';
import {AbsenceRequestInterface} from "../../../../classes/pages/profile/absence/request/absence-request.interface";
import {MatDialog} from "@angular/material/dialog";
import {AbsenceRequestDialog} from "../request/absence-request.component";

//eof testing shared service

@Component({
    selector: 'profile-absence-requests',
    templateUrl: './profile-absence-requests.component.html',
    styleUrls: ['./profile-absence-requests.component.scss']
})
export class ProfileAbsenceRequestsComponent implements OnInit {

    //testing shared service //
    subscription: Subscription;
    //eof testing shared service

    displayedColumns: string[] = ['start_date', 'end_date', 'days', 'type_name', 'approval', 'actions'];
    absence_requests: MatTableDataSource<any>;
    recent_requests
    @Input() public requests
    @Input() public archieve


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private absence_types_service: AbsenceTypesService,
        private absences_service: AbsencesService,
        private dialog: MatDialog,
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
        //testing shared service //
        this.subscription = this.absences_service.dataChange.subscribe((request: AbsenceRequestInterface) => {
            const index = this.recent_requests.data.findIndex(r => r.id === request.id);
            if (index === -1) {
                this.recent_requests.data.push(request);
            } else {
                this.recent_requests.data[index] = request;
            }
            this.recent_requests.paginator = this.paginator;
            this.recent_requests.sort = this.sort;
        });
        //eof testing shared service
    }

    //testing shared service //
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    //eof testing shared service

    private get(): void {
        this.absences_service.getForEmployee(2).subscribe(
            result => {
                this.recent_requests = this.sortRequest(result);
                console.log(result);
                this.recent_requests = new MatTableDataSource(result);
                this.recent_requests.paginator = this.paginator;
                this.recent_requests.sort = this.sort;
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

    private sortRequest(request) {
        return request.sort((a, b) => {
            if (a.approval === "WAITING" && b.approval !== "WAITING") {
                return -1;
            }
            if (a.approval !== "WAITING" && b.approval === "WAITING") {
                return 1;
            }
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }).slice(0, 3);
    }

    public humanizedStatus(status) {
        switch (status) {
            case 'WAITING':
                return 'Очаква потвърждение.';
            default:
                return 'Получена';
        }
    }

    public edit(request) {
        this.dialog.open(AbsenceRequestDialog, {
            data: {
                request: request
            }
        })
    }

    public changeStatus(absence, status){
        absence.approval = status
        this.absences_service.edit(absence).subscribe(result => {

        })
    }
    public delete(request) {

    }


}
