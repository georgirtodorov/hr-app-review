import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';

export class ForceChangePasswordForm<T> {
    public formGroup: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {
        this.formGroup = this.fb.group({
            user_id: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^\S*$/)]],
            password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^\S*$/)]],
        }, {validator: [this.checkPasswords]});
    }

    private checkPasswords(group: UntypedFormGroup) {
        let password = group.get('password').value;
        let passwordConfirmation = group.get('password_confirmation').value;
        return password === passwordConfirmation ? null : {passwordNotMatch: true}
    }
}
