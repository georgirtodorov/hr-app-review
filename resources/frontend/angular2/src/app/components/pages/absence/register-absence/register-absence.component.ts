import {Component, Inject, Input, OnInit} from '@angular/core';
import {AbsenceRequestInterface} from "../../../../classes/pages/profile/absence/request/absence-request.interface";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AbsenceRequestForm} from "../../../../classes/pages/profile/absence/request/absence-request-form";
import {UntypedFormBuilder} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {AbsencesService} from "../../../../services/pages/absences/absences.service";
import {SwalService} from "../../../../services/helpers/swal/swal.service";
import {Subscription} from "rxjs";
import {BackendError} from "../../../../classes/error/BackendError";
import {OfficialHolidaysService} from "../../../../services/pages/settings/official-holidays.service";

@Component({
  selector: 'register-absence',
  templateUrl: './register-absence.component.html',
  styleUrls: ['./register-absence.component.scss']
})
export class RegisterAbsenceComponent implements OnInit {

    @Input() public employees
    @Input() public is_edit: boolean = false
    @Input() public absence_types
    public remaining_days
    public selected_type
    public selected_employee
    public requestForm: AbsenceRequestForm<AbsenceRequestInterface>
    private subscription: Subscription;
    public submitting: boolean = false;
    private holidays: any;

  constructor(
      private fb: UntypedFormBuilder,
      public datepipe: DatePipe,
      private absences_service: AbsencesService,
      private swal_service: SwalService,
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
        console.log(this.employees)
  }

    setEmployee()
    {
        let employee_id = this.requestForm.formGroup.get('employee_id').value;
        this.selected_employee = this.employees.find(employee => employee.id === employee_id);
        let type_id = this.requestForm.formGroup.get('type_id').value;
        if (type_id) {
            this.calcAvailableDays(type_id);
        }
    }

    public calcAvailableDays(type_id: number) {
        if (!this.selected_employee) {
            return;
        }
        let days_left = this.selected_employee.remaining_days.list.find(item => item.typeId === type_id);
        let type = this.absence_types.find(type => type.id === type_id);

        if (!days_left) {
            this.remaining_days = undefined;
            return;
        }
        this.remaining_days = days_left.remaining;
        this.selected_type = (type.details) ? type.name + '(' + type.details + ')' : type.name;
    }

    public combinedFilter = (d: Date | null): boolean => {
        return this.weekendFilter(d) && this.holidayFilter(d);
    };

    public weekendFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getDay();
        return day !== 0 && day !== 6;
    }

    public holidayFilter = (d: Date | null): boolean => {
        if (!d) {
            return false;
        }
        // Check if the selected date is in the holidays array
        return !this.holidays.some(holiday => holiday.toDateString() === d.toDateString());
    };

    add()
    {
        this.submitting = true;
        this.requestForm.formGroup.patchValue({
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

            if (result instanceof BackendError) {
                this.swal_service.error({
                    title: `${result.title()}`,
                    text: ` Възникна грешка при добавянето на записa: ${result.message()}`
                });
                this.submitting = false;
                return;
            }
            // Вместо това долу, трябва да се вика сервиза за емплоии и да презаписва ремеининг дейс формата на записа
            // this.getRemainingDays(this.requestForm.formGroup.get('employee_id').value);
            this.swal_service.success({title: 'Молбата е регистрирана. 2'});
            this.requestForm.formGroup.patchValue({start_date: null, end_date: null});
            this.requestForm.formGroup.markAsUntouched();
            // this.requestCreated.emit(result); нз дали ми трябва това
            this.submitting = false;
        }, error => {
            this.submitting = false;
            this.swal_service.error({title: `${error.title()}`, text: `${error.message()}`});
        })
    }

    edit()
    {

    }
}


@Component({
    template: '<mat-dialog-content>' +
        '<register-absence [employees]="employees" [absence_types]="absence_types"></register-absence>' +
        '</mat-dialog-content>',
    styleUrls: ['./register-absence.component.scss']
})

export class RegisterAbsenceDialog implements OnInit {
    public employees
    public absence_types
    public request: AbsenceRequestInterface

    constructor(
        @Inject(MAT_DIALOG_DATA) public data
    ) {

    }

    ngOnInit(): void {
        this.employees = this.data.employees;
        this.absence_types = this.data.absence_types;
    }
}
