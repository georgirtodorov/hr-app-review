import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {SwalService} from '../../../../services/helpers/swal/swal.service';
import {UntypedFormBuilder} from '@angular/forms';
import {AbsenceTypesService} from '../../../../services/pages/settings/absence-types.service'
import {AbsencesArchiveService} from '../../../../services/pages/settings/absences-archive.service'
import {AbsencesService} from '../../../../services/pages/absences/absences.service'
import {EmployeesService} from '../../../../services/pages/employees/employees.service'

import {
    AbsenceRequestInterface,
    AbsenceRequestApprovalStatus
} from '../../../../classes/pages/profile/absence/request/absence-request.interface'
import {AbsenceRequestForm} from '../../../../classes/pages/profile/absence/request/absence-request-form'
import {DatePipe} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BackendError} from "../../../../classes/error/BackendError";
import {OfficialHolidaysService} from "../../../../services/pages/settings/official-holidays.service";

@Component({
    selector: 'absence-request',
    templateUrl: './absence-request.component.html',
    styleUrls: ['./absence-request.component.scss']
})
export class AbsenceRequestComponent implements OnInit {
    @Input() public is_edit: boolean = false;
    @Input() public archive
    @Input() public request: AbsenceRequestInterface;
    @Output() requestCreated = new EventEmitter<AbsenceRequestInterface>();
    @Output() requestEdited = new EventEmitter<AbsenceRequestInterface>();


    public selected_type
    public remaining_days
    public remaining_days_list

    public requestForm: AbsenceRequestForm<AbsenceRequestInterface>
    private employee


    types


    days
    public submitting: boolean = false;
    private holidays: any;


    constructor(
        private swal_service: SwalService,
        private absence_types_service: AbsenceTypesService,
        private absence_archive_service: AbsencesArchiveService,
        private absences_service: AbsencesService,
        private employees_service: EmployeesService,
        private fb: UntypedFormBuilder,
        public datepipe: DatePipe,
        private holidays_service: OfficialHolidaysService
    ) {
        this.requestForm = new AbsenceRequestForm<AbsenceRequestInterface>(fb);
        this.requestForm.formGroup.patchValue({
            'type_id': 1
        })
        this.holidays_service.get().subscribe(r => {
            this.holidays = r.map(dateString => new Date(dateString.date));
        });
    }

    ngOnInit(): void {
        if (this.request?.id) {
            this.requestForm.formGroup.patchValue({
                'id': this.request.id,
                'type_id': this.request.type_id,
                'employee_id': this.request.employee_id,
                'days': this.request.days,
                'end_date': this.request.end_date,
                'start_date': this.request.start_date,
            })
            // this.employee.id = this.request.employee_id;
            this.is_edit = true;
        }
        this.getTypes();
        this.getEmployee();

        // this.absences_service.getRemainingDays().subscribe(result => {
        //     console.log(result);
        // })
    }


    private getEmployee() {
        this.employees_service.getEmployee().subscribe(result => {
            this.employee = result;
            this.getRemainingDays(result.id);

        })
    }

    private getRemainingDays(employee_id) {
        this.absences_service.getRemainingDaysCurrentUser(employee_id).subscribe(result => {
            if (!result) {
                this.swal_service.error({text: 'Възникна грешка при изчисляването на оставащите дни отпуск:' + result});
                return;
            }
            console.log('dsadasa');
            console.log(result);
            this.remaining_days_list = result;
            let days_left = result.find(item => item.typeId === this.requestForm.formGroup.get('type_id').value);
            this.remaining_days = days_left.remaining;

        });

    }

    private getTypes() {
        this.absence_types_service.get().subscribe(result => {
            this.types = result;
        })
    }

    public calcAvailableDays(type_id: number) {
        let days_left = this.remaining_days_list.find(item => item.typeId === type_id);
        let type = this.types.find(type => type.id === type_id);

        if (!days_left) {
            this.remaining_days = undefined;
            return;
        }
        this.remaining_days = days_left.remaining;
        this.selected_type = (type.details) ? type.name + '(' + type.details + ')' : type.name;
    }

    public add() {
        this.submitting = true;
        this.requestForm.formGroup.patchValue({
            'employee_id': this.employee.id,
            'start_date': this.datepipe.transform(this.requestForm.formGroup.get('start_date').value, 'YYYY-MM-dd'),
            'end_date': this.datepipe.transform(this.requestForm.formGroup.get('end_date').value, 'YYYY-MM-dd'),
        })

        this.requestForm.formGroup.markAllAsTouched();
        if (!this.requestForm.formGroup.valid) {
            this.submitting = false;
            return;
        }
        this.swal_service.loader();
        this.absences_service.add(this.requestForm.formGroup.getRawValue()).subscribe(result => {
            if (!result) {
                this.swal_service.error({text: 'Възникна грешка при добавянето на записa:' + result});
                this.submitting = false;
                return;
            }

            if (result?.error) {
                this.swal_service.error({
                    text: ` Възникна грешка при добавянето на записa: ${result.error}`
                });
                this.submitting = false;
                return;
            }

            this.getRemainingDays(this.requestForm.formGroup.get('employee_id').value);
            this.swal_service.success({title: 'Молбата е регистрирана.'});
            this.requestForm.formGroup.patchValue({start_date: null, end_date: null});
            this.requestForm.formGroup.markAsUntouched();
            this.requestCreated.emit(result);
            this.submitting = false;
        }, error => {
            this.submitting = false;
            this.swal_service.error({title: `${error.title()}`, text: `Възникна грешка при добавянето на записa: ${error.message()}`});
        })
    }

    public edit(){
        this.requestForm.formGroup.patchValue({
            'start_date': this.datepipe.transform(this.requestForm.formGroup.get('start_date').value, 'YYYY-MM-dd'),
            'end_date': this.datepipe.transform(this.requestForm.formGroup.get('end_date').value, 'YYYY-MM-dd'),
        })
        this.requestForm.formGroup.markAllAsTouched();
        this.swal_service.loader();
        if (this.requestForm.formGroup.valid) {
            this.absences_service.edit(this.requestForm.formGroup.getRawValue()).subscribe(result => {
                if (result) {
                    this.getRemainingDays(this.requestForm.formGroup.get('employee_id').value);
                    this.swal_service.success({title: 'Молбата е обновена.'});
                    this.requestEdited.emit(result);
                } else {
                    this.swal_service.error({text: 'Възникна грешка при добавянето на записa:' + result});
                }
            }, error => {
                this.swal_service.error({title: `${error.title()}`, text: `Възникна грешка при добавянето на записa: ${error.message()}`});
            })
        }
    }



    public weekendFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getDay();
        return day !== 0 && day !== 6;
    }

    public combinedFilter = (d: Date | null): boolean => {
        return this.weekendFilter(d) && this.holidayFilter(d);
    };

    public holidayFilter = (d: Date | null): boolean => {
        if (!d) {
            return false;
        }
        // Check if the selected date is in the holidays array
        return !this.holidays.some(holiday => holiday.toDateString() === d.toDateString());
    };

//testing shared service //-->
    updateData() {
        this.absences_service.setData({ value: 'Child 1 updated data' });
    }
//eof testing shared service-->

}

@Component({
    template: '<mat-dialog-content>' +
        '<absence-request [request]="request" (requestEdited)="onRequestEdited($event)"></absence-request>' +
        '</mat-dialog-content>',
    styleUrls: ['./absence-request.component.scss']
})
export class AbsenceRequestDialog implements OnInit {
    public request: AbsenceRequestInterface

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private dialogRef: MatDialogRef<AbsenceRequestDialog>
    ) {

    }

    ngOnInit(): void {
        this.request = this.data.request;
    }

    onRequestEdited(editedRequest: AbsenceRequestInterface) {
        this.request = editedRequest;
        this.dialogRef.close(this.request)
    }
}
