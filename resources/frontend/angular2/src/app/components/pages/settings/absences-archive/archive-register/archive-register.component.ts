import {Component, Inject, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Employee} from '../../../../../classes/pages/Employee'
import {AbsencesArchiveService} from '../../../../../services/pages/settings/absences-archive.service';
import {EmployeesService} from '../../../../../services/pages/employees/employees.service';
import {AbsenceTypesService} from '../../../../../services/pages/settings/absence-types.service';
import {FormGroup, UntypedFormBuilder, Validators, FormControl, FormsModule} from '@angular/forms';
import {SwalService} from "../../../../../services/helpers/swal/swal.service";

@Component({
    selector: 'absences-archive-register',
    templateUrl: './archive-register.component.html',
    styleUrls: ['./archive-register.component.scss']
})
export class AbsencesArchiveRegisterComponent implements OnInit {
    public filter = '';
    public employees: Array<Employee> = [];
    public absence_types;
    public absence = {
        'type_id': '',
        'employee_id': '',
        'days': '',
        'due_date': ''
    }
    public form = this.fb.group({
        type_id: ['', [Validators.required]],
        employee_id: ['', [Validators.required]],
        days: ['', [Validators.required]],
        due_date: ['', [Validators.required]],
    });
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<any>,
        private employees_service: EmployeesService,
        private absence_types_service: AbsenceTypesService,
        private absences_archive_service: AbsencesArchiveService,
        private fb: UntypedFormBuilder,
        private swal_service: SwalService,
        public datepipe: DatePipe,
    ) {
    }

    ngOnInit(): void {
        this.getAbsenceTypes();
        this.getEmployees();

    };

    private getEmployees() {
        this.employees_service.getEmployees().subscribe(result => {
            console.log(result)
            this.employees = result;
        })
    }

    private getAbsenceTypes() {
        this.absence_types_service.get().subscribe(result => {
            console.log(result)
            this.absence_types = result;
        })
    }

    public filtering(event: Event): void {
        this.filter = String(event);
    };

    public add() {
        console.log(this.form.valid)
        console.log(this.absence)
        if (this.form.valid) {
            this.absence.due_date = this.datepipe.transform(this.absence.due_date, 'YYYY-MM-dd');

            this.absences_archive_service.add(this.absence).subscribe(
                result => {
                    if (result) {
                        this.dialogRef.close(
                            this.getResponseData()
                        );
                    } else {
                        this.swal_service.error({text: 'Възникна грешка при добавянето на записa:' + result});
                    }
                }, error => {
                    this.swal_service.error({text: 'Възникна грешка при добавянето на записa: ' + error.message});
                }
            )
        }
    }

    private getResponseData(): any {
        return {
            'absence': this.absence,
            'employee': this.employees.filter(e => e.id == this.absence.employee_id)
        };
    };
}
