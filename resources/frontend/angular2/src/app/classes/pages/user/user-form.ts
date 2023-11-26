import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';

export class UserForm<T> {
    public formGroup: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {
        this.formGroup = this.fb.group({
            first_name: ['', [Validators.required, Validators.pattern('^[\u0041-\u005A\u0410-\u042F][\u0061-\u007A\u0430-\u044F]{0,14}$')]],
            last_name: ['', [Validators.required, Validators.pattern('^[\u0041-\u005A\u0410-\u042F][\u0061-\u007A\u0430-\u044F]{0,14}$')]],
            email: ['', [Validators.required, Validators.email]],
            email_confirmation: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^\S*$/)]],
            password_confirmation: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^\S*$/)]]
        }, {validator: [this.checkEmails, this.checkPasswords]});
    }

    private checkEmails(group: UntypedFormGroup) {
        let email = group.get('email').value;
        let emailConfirmation = group.get('email_confirmation').value;
        return email === emailConfirmation ? null : {emailsNotMatch: true}

    }

    private checkPasswords(group: UntypedFormGroup) {
        let password = group.get('password').value;
        let passwordConfirmation = group.get('password_confirmation').value;
        return password === passwordConfirmation ? null : {passwordNotMatch: true}
    }
}
