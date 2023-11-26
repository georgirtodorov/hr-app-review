import {Component, OnInit, Input, Inject} from '@angular/core';
import { UntypedFormBuilder} from '@angular/forms';
import {SwalService} from "../../../../services/helpers/swal/swal.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {PasswordService} from "../../../../services/pages/password/password.service";
import {ForgottenPasswordForm} from "../../../../classes/pages/password/forgotten-password-form";
import {ForgottenPassword} from "../../../../classes/pages/password/password.interface";

@Component({
    selector: 'forgotten-password-dialog',
    template: '<mat-dialog-content><forgotten-password [email]="email"></forgotten-password></mat-dialog-content>',
    styleUrls: ['./forgotten-password.component.scss']
})

export class ForgottenPasswordDialog {

    public email: string = '';
    constructor(
        public dialogRef: MatDialogRef<ForgottenPasswordDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.email = data.email ?? ''
    }
}

@Component({
    selector: 'forgotten-password',
    templateUrl: './forgotten-password.component.html',
    styleUrls: ['./forgotten-password.component.scss']
})

export class ForgottenPasswordComponent implements OnInit {

    @Input() email: string = '';
    public emailForm: ForgottenPasswordForm<ForgottenPassword>

    constructor(
        private dialogRef: MatDialogRef<ForgottenPasswordDialog>,
        private password_service: PasswordService,
        private fb: UntypedFormBuilder,
        private swal_service: SwalService
    ) {
        this.emailForm = new ForgottenPasswordForm<ForgottenPassword>(fb);
    }

    ngOnInit()
    {
        this.emailForm.formGroup.patchValue({email: this.email});
    }

    sendLink()
    {
        this.emailForm.formGroup.markAllAsTouched();
        if (!this.emailForm.formGroup.valid) {
            return;
        }
        this.swal_service.loader().fire();
        this.password_service.forgottenPassword(this.emailForm.formGroup.getRawValue()).subscribe(result => {
            if (result['success']) {
                this.swal_service.success({text: result['message']})
                this.closeDialog();
            } else {
                this.swal_service.error({text: 'Reset email was not send'})
            }
        }, error => {
            this.swal_service.error({text: error.error})
        })
    }

    closeDialog()
    {
        this.dialogRef.close(); // Close the dialog
    }
}
