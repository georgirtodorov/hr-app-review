import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OfficialHolidaysService} from "../../../../../services/pages/settings/official-holidays.service";
import {
    OfficialHolidaysInterface
} from "../../../../../classes/pages/settings/official-holidays/official-holidays.interface";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BackendError} from "../../../../../classes/error/BackendError";
import {SwalService} from "../../../../../services/helpers/swal/swal.service";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'add-holiday',
    templateUrl: './add-holiday.component.html',
    styleUrls: ['./add-holiday.component.scss']
})
export class AddHolidayComponent implements OnInit
{
    @Input() holiday: OfficialHolidaysInterface

    holidayForm: FormGroup;

    constructor(
        private holidays_service: OfficialHolidaysService,
        private swal_service: SwalService,
        public datepipe: DatePipe,
    )
    {
        this.holidayForm = new FormGroup({
            id: new FormControl<number | null>(null),
            date: new FormControl<Date | null>(null, [Validators.required]),
            name: new FormControl<string>('', [Validators.required])
        });
    }

    ngOnInit(): void
    {
        if (this.holiday) {
            this.holidayForm.patchValue(this.holiday)
        }
    }

    submitForm()
    {
        if (this.holidayForm.invalid) {
            return;
        }
        this.holidayForm.patchValue({
            'date': this.datepipe.transform(this.holidayForm.get('date').value, 'YYYY-MM-dd'),
        })
        if (this.holidayForm.get('id').value) {
            this.update()
        } else {
            this.store()
        }

    }

    store()
    {
        this.swal_service.loader();
        this.holidays_service.store(this.holidayForm.value).subscribe((r: any) => {
            if (r.id) {
                this.swal_service.success({text: 'Записа беше добавен'});
                return
            }
            this.swal_service.error({text: 'Записа не е добавен'})
        }, (error: BackendError) => {
            this.swal_service.error({title: `${error.title()}`, text: `${error.message()}`});
        })
    }

    update()
    {
        this.swal_service.loader();
        this.holidays_service.update(this.holidayForm.value, this.holiday.id).subscribe((r: any) => {
            if (r.id) {
                this.swal_service.success({text: 'Записа беше обновен'});
                return
            }
            this.swal_service.error({text: 'Записа не е обновен'})
        }, (error: BackendError) => {
            this.swal_service.error({title: `${error.title()}`, text: `${error.message()}`});
        })
    }
}

@Component({
    template: '<mat-dialog-content><add-holiday [holiday]="holiday"></add-holiday></mat-dialog-content>',
    styleUrls: ['./add-holiday.component.scss']
})

export class EditHolidayDialog
{
    public holiday: OfficialHolidaysInterface;

    constructor(
        public dialogRef: MatDialogRef<EditHolidayDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    )
    {
        this.holiday = data?.holiday ?? ''
    }
}
