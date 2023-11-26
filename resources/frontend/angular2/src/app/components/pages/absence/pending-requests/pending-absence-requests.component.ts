import {Component, OnInit, Input, Inject, EventEmitter, Output} from '@angular/core';
import {AbsencesService} from '../../../../services/pages/absences/absences.service'
import {MatTableDataSource} from '@angular/material/table';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {
    AbsenceRequestApprovalStatus,
    AbsenceRequestInterface
} from "../../../../classes/pages/profile/absence/request/absence-request.interface";
import {AbsenceRequestForm} from "../../../../classes/pages/profile/absence/request/absence-request-form";
import {UntypedFormBuilder} from "@angular/forms";
import {SwalService} from "../../../../services/helpers/swal/swal.service";
import {ProfileData} from "../../../../classes/pages/profile/profile-data/profile-data.interface";
import {text} from "express";
import {AbsenceRequestDialog} from "../request/absence-request.component";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendError} from "../../../../classes/error/BackendError";
import {EmployeesService} from "../../../../services/pages/employees/employees.service";
import {Employee} from "../../../../classes/pages/Employee";
import {UserPermissionsService} from "../../../../services/helpers/permissions/user-permissions.service";


@Component({
    selector: 'pending-absence-requests',
    templateUrl: './pending-absence-requests.component.html',
    styleUrls: ['./pending-absence-requests.component.scss']
})
export class PendingAbsenceRequestsComponent implements OnInit
{
    @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();
    @Input() public employee;
    @Input() public requests: Array<AbsenceRequestInterface>;
    displayedColumns: string[] = ['created', 'start_date', 'end_date', 'days', 'type_name', 'approval', 'actions'];
    absence_requests: MatTableDataSource<any>;
    public approved: AbsenceRequestApprovalStatus = AbsenceRequestApprovalStatus.APPROVED;
    public declined: AbsenceRequestApprovalStatus = AbsenceRequestApprovalStatus.DECLINED;

    private requestForm: AbsenceRequestForm<AbsenceRequestInterface>;

    public loggedEmployee: Employee;
    private canEditGlobal: boolean;
    private canEditSupervision: boolean;
    private canEdit: boolean;
    private canApproveGlobal: boolean;
    private canApproveSupervision: boolean;

    constructor(
        private absences_service: AbsencesService,
        private fb: UntypedFormBuilder,
        private swal_service: SwalService,
        private dialog: MatDialog,
        public datepipe: DatePipe,
        private employee_service: EmployeesService,
        private user_permissions: UserPermissionsService
    )
    {
        this.requestForm = new AbsenceRequestForm<AbsenceRequestInterface>(fb);
    }

    ngOnInit(): void
    {
        this.getCurrentEmployee();
        this.checkPermissions();
        this.absence_requests = new MatTableDataSource(this.requests);
    }

    approve(request: AbsenceRequestInterface)
    {
        this.swal_service.loader();
        this.absences_service.approve(this.requestForm.formGroup.getRawValue()).subscribe(response => {
            if (!response) {
                return this.updateError(request);
            }
            if (response) {
                this.employee.remaining_days.paid_days_left -= response.days;
                this.updateSuccess(request.approval)
            }
        }, (error: BackendError) => {
            request.approval = AbsenceRequestApprovalStatus.WAITING;
            this.swal_service.error({title: `${error.title()}`, text: `${error.message()}`});
        });
    }

    decline(request: AbsenceRequestInterface)
    {
        this.swal_service.loader();
        this.absences_service.decline(this.requestForm.formGroup.getRawValue()).subscribe(response => {
            if (!response) {
                return this.updateError(request);
            }
            if (response) {
                this.updateSuccess(request.approval)
            }
        }, error => {
            this.swal_service.error({title: `${error.title()}`, text: `${error.message()}`});
        })
    }

    private updateError(request: AbsenceRequestInterface): void
    {
        request.approval = AbsenceRequestApprovalStatus.WAITING;
        this.swal_service.error({text: 'Възникна грешка при обновяването на статуса!'})
    }

    private updateSuccess(action: AbsenceRequestApprovalStatus): void
    {
        let msg = action === AbsenceRequestApprovalStatus.DECLINED ? 'отказана' : 'одобрена'
        this.swal_service.success({title: `Молбата за отпуск е ${msg}!`}).then(r => {
            if (r.isConfirmed) {
                if (this.requests.length == 1) {
                    this.closeDialog.emit();
                }
            }
        });
    }

    changeStatus(request: AbsenceRequestInterface, action: AbsenceRequestApprovalStatus)
    {
        request.approval = action;
        this.requestForm.formGroup.patchValue(request);
        this.requestForm.formGroup.markAllAsTouched();
        if (!this.requestForm.formGroup.valid) {
            return;
        }
        switch (action) {
            case AbsenceRequestApprovalStatus.APPROVED:
                this.approve(request);
                break;
            case AbsenceRequestApprovalStatus.DECLINED:
                this.decline(request);
        }
    }

    edit(request: AbsenceRequestInterface)
    {
        const dialogRef: MatDialogRef<AbsenceRequestDialog> = this.dialog.open(AbsenceRequestDialog, {
            data: {
                request: request
            }
        });

        dialogRef.afterClosed().subscribe(updatedRequest => {
            // This function will be called when the dialog is closed
            if (updatedRequest) {
                // The dialog was closed with updated data
                this.updateRequest(updatedRequest);
            } else {
                // The dialog was closed without any changes (or it was dismissed)
                // Handle this case if needed
            }
        });
    }

    updateRequest(updatedRequest: AbsenceRequestInterface)
    {
        const indexToUpdate = this.requests.findIndex(request => request.id === updatedRequest.id);

        if (indexToUpdate !== -1) {
            // If the request with the matching 'id' is found, update it
            this.requests[indexToUpdate] = updatedRequest;
            this.absence_requests = new MatTableDataSource(this.requests);
        } else {
            // Handle the case when the request is not found (optional)
            console.log('Request not found in the array.');
        }

        // Now 'this.requests' contains the updated data
        console.log('Updated Requests:', this.requests);
        // ...
    }

    private getCurrentEmployee()
    {
        this.employee_service.getEmployee().subscribe(r => this.loggedEmployee = r)
    }

    private checkPermissions()
    {
        this.user_permissions.hasPermission('can_edit_absence_request').subscribe(r => this.canEdit = r)
        this.user_permissions.hasPermission('can_edit_absence_request_global').subscribe(r => this.canEditGlobal = r)
        this.user_permissions.hasPermission('can_edit_absence_request_supervision').subscribe(r => this.canEditSupervision = r)

        this.user_permissions.hasPermission('can_approve_absence_request_global').subscribe(r => this.canApproveGlobal = r)
        this.user_permissions.hasPermission('can_approve_absence_request_supervision').subscribe(r => this.canApproveSupervision = r)
    }

    public canBeEdited(employee_id): boolean
    {
        if (this.canEditGlobal) {
            return false;
        }
        if (employee_id === this.loggedEmployee?.id && this.canEdit) {
            return false;
        }
        if (this.canEditSupervision) {
            const is_subordinate = this.loggedEmployee.subordinates.some(subordinate => subordinate.id === employee_id);
            if (is_subordinate) {
                return false;
            }
        }
        return true
    }

    public canApprove(employee_id): boolean
    {
        if (this.canApproveGlobal) {
            return false;
        }
        if (this.canApproveSupervision) {
            const is_subordinate = this.loggedEmployee.subordinates.some(subordinate => subordinate.id === employee_id);
            if (is_subordinate) {
                return false;
            }
        }
        return true
    }

}

@Component({
    selector: 'pending-absence-requests-dialog',
    template: `
        <h1>{{employee.first_name}} {{employee.last_name}}</h1>
        <div class="scrollable-content">
            <pending-absence-requests
                [employee]="employee"
                [requests]="requests"
                (closeDialog)="onCloseDialog()"
            >
            </pending-absence-requests>
        </div>
    `,
    styleUrls: ['./pending-absence-requests.component.scss']
})
export class PendingRequestsDialog
{
    public employee;
    public requests: Array<AbsenceRequestInterface>;

    constructor(
        public dialogRef: MatDialogRef<PendingRequestsDialog>,
        private router: Router,
        private route: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) public data: any
    )
    {
        this.employee = data.employee
        this.requests = data.requests
    }

    onCloseDialog()
    {
        this.dialogRef.close();
    }
}
