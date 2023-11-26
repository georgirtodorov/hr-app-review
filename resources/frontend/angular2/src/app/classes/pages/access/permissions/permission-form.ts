import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';

export class PermissionForm<T> {
    public formGroup: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {
        this.formGroup = this.fb.group({
            id: ['', null],
            name: ['', Validators.required],
            localized_name: ['', Validators.required],
            localized_description: ['', null]
        })
    }
}
