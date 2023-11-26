import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';

export class ProfileDataForm<T> {
    public formGroup: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {
        this.formGroup = this.fb.group({
            id: ['', null],
            user_id: ['', null],
            department_id: ['', [Validators.required]],
            position_id: ['', [Validators.required]],
            location_id: ['', [Validators.required]],
            supervisors: [[], null],
            first_name: ['', [Validators.required, Validators.pattern('^[А-ЯЁа-яёA-Z][А-ЯЁа-яёA-Za-z]{0,14}$')]],
            last_name: ['', [Validators.required, Validators.pattern('^[А-ЯЁа-яёA-Z][А-ЯЁа-яёA-Za-z]{0,14}$')]],
            surname: ['', [Validators.required, Validators.pattern('^[А-ЯЁа-яёA-Z][А-ЯЁа-яёA-Za-z]{0,14}$')]],
            email: ['', [Validators.required, Validators.email]],
            city: ['', [Validators.required, Validators.pattern('^[А-ЯЁа-яёA-Z][А-ЯЁа-яёA-Za-z]{0,14}$')]],
            post_code: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
            address: ['', [Validators.required, Validators.maxLength(50)]],
            country: ['', [Validators.required]],
            pin: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            personal_phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            start: ['', Validators.required],
            work_phone: ['', [Validators.pattern('^[0-9]{10}$')]],
        });
    }
}
