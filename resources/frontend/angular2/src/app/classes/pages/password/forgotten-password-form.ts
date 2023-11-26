import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';

export class ForgottenPasswordForm<T> {
    public formGroup: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {
        this.formGroup = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        }, {validator: []});
    }
}
