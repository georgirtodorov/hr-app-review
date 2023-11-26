import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';

export class PasswordResetForm<T> {
    public formGroup: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {
        this.formGroup = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^\S*$/)]],
            password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^\S*$/)]],
            token: ['', [Validators.required]] // Make the token required
        }, {validator: [this.checkPasswords]});
    }

    private checkPasswords(group: UntypedFormGroup) {
        let password = group.get('password').value;
        let passwordConfirmation = group.get('password_confirmation').value;
        return password === passwordConfirmation ? null : {passwordNotMatch: true}
    }
}
