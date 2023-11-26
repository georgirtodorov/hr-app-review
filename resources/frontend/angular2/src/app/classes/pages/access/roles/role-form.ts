import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';

export class RoleForm<T> {
    public formGroup: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {
        this.formGroup = this.fb.group({
            id: ['', null],
            name: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_-]*$')]],
            permissions: [[], null]
        })
    }
}
