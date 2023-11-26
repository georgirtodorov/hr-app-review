import {UntypedFormGroup, UntypedFormBuilder, Validators, ValidatorFn} from '@angular/forms';

export class AbsenceRequestForm<T> {
    public formGroup: UntypedFormGroup;

    private daysValidators: ValidatorFn[];
    private approvalValidators: ValidatorFn[];

    constructor(private fb: UntypedFormBuilder) {
        this.formGroup = this.fb.group({
            id: [null],
            employee_id: ['', Validators.required],
            type_id: ['', Validators.required],
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            days: [{value: '', disabled: true}],
            approval: [''],
        }, {validator: [(formGroup: UntypedFormGroup) => this.validateId(formGroup)]});

        this.daysValidators = [];
        this.approvalValidators = [];
    }

    validateId(formGroup: UntypedFormGroup) {
        const id = formGroup.get('id');
        if (!id.value) {
            return null;
        }

        const days = formGroup.get('days');

        if (!this.daysValidators.includes(Validators.required)) {
            this.daysValidators.push(Validators.required);
            days.setValidators(this.daysValidators);
            days.updateValueAndValidity();
            days.enable();
        }
    }
}
