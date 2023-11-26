import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';

export class PasswordChangeForm<T> {
    public formGroup: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {
        this.formGroup = this.fb.group({
            current_password: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
            new_password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^\S*$/)]],
            new_password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^\S*$/)]]
        }, {validator: [this.checkPasswords]});
    }

    private checkPasswords(group: UntypedFormGroup) {
        let password = group.get('new_password').value;
        let passwordConfirmation = group.get('new_password_confirmation').value;
        return password === passwordConfirmation ? null : {passwordNotMatch: true}
    }
}
