import {Component, OnInit, EventEmitter, Output, Input, Inject} from '@angular/core';
import {UntypedFormGroup, UntypedFormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PlatformLocation} from '@angular/common';
import {UrlBuilderService} from "../../../../services/helpers/url-builder/url-builder.service";
import {SwalService} from "../../../../services/helpers/swal/swal.service";

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PasswordService} from "../../../../services/pages/password/password.service";
import {BackendError} from "../../../../classes/error/BackendError";
import {PasswordReset} from "../../../../classes/pages/password/password.interface";
import {PasswordResetForm} from "../../../../classes/pages/password/password-reset-form";


@Component({
    selector: 'reset-password-dialog',
    template: '<mat-dialog-content><reset-password [email]="email" [token]="token"></reset-password></mat-dialog-content>',
    styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordDialog
{

    public email: string = '';
    public token: string = '';

    constructor(
        public dialogRef: MatDialogRef<ResetPasswordDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    )
    {
        this.email = data.email ?? ''
        this.token = data.token ?? ''
    }
}


@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit
{
    public passwordForm: PasswordResetForm<PasswordReset>
    @Input() email: string = ''
    @Input() token: string = ''
    hide = true;
    hideConfirmation = true;

    get passwordInput()
    {
        return this.passwordForm.formGroup.get('password');
    }

    get passwordConfirmationInput()
    {
        return this.passwordForm.formGroup.get('password_confirmation');
    }

    constructor(
        private fb: UntypedFormBuilder,
        private http: HttpClient,
        private platform_location: PlatformLocation,
        private router: Router,
        private url: UrlBuilderService,
        private password_service: PasswordService,
        private swal_service: SwalService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<ResetPasswordDialog>,
    )
    {
        this.passwordForm = new PasswordResetForm<PasswordReset>(fb);
    }

    ngOnInit(): void
    {
        this.passwordForm.formGroup.patchValue({
            email: this.email,
            token: this.token
        });
    }

    resetPassword()
    {
        this.passwordForm.formGroup.markAllAsTouched();
        if (!this.passwordForm.formGroup.valid) {
            return;
        }
        this.swal_service.loader().fire()
        this.password_service.resetPassword(this.passwordForm.formGroup.getRawValue()).subscribe(result => {
            if (result?.['success']) {
                this.swal_service.success({text: 'Паролата е променета, може да влезете с акаунта си.'});
                this.closeDialog();
            } else {
                this.swal_service.error({text: 'Възникна проблем при промяната на паролата'})
            }
        }, (error: BackendError) => {
            this.swal_service.error({title: `${error.title()}`, text: `${error.message()}`});
        })
    }

    closeDialog()
    {
        this.dialogRef.close(); // Close the dialog
    }
}
