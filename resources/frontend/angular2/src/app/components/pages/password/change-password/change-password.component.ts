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
import {PasswordChange} from "../../../../classes/pages/password/password.interface";
import {PasswordChangeForm} from "../../../../classes/pages/password/password-change-form";


@Component({
    selector: 'change-password-dialog',
    template: '<mat-dialog-content><change-password></change-password></mat-dialog-content>',
    styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordDialog
{
    constructor(
        public dialogRef: MatDialogRef<ChangePasswordDialog>,
    )
    {
    }
}


@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit
{
    public passwordForm: PasswordChangeForm<PasswordChange>
    hide = true;
    hideConfirmation = true;
    get passwordInput() { return this.passwordForm.formGroup.get('new_password'); }
    get passwordConfirmationInput() { return this.passwordForm.formGroup.get('new_password_confirmation'); }

    constructor(
        private fb: UntypedFormBuilder,
        private http: HttpClient,
        private platform_location: PlatformLocation,
        private router: Router,
        private url: UrlBuilderService,
        private password_service: PasswordService,
        private swal_service: SwalService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<ChangePasswordDialog>,
    )
    {
        this.passwordForm = new PasswordChangeForm<PasswordChange>(fb);
    }

    ngOnInit(): void
    {
    }

    changePassword()
    {
        this.passwordForm.formGroup.markAllAsTouched();
        if (!this.passwordForm.formGroup.valid) {
            return;
        }
        this.swal_service.loader().fire()
        this.password_service.changePassword(this.passwordForm.formGroup.getRawValue()).subscribe(result => {
            if (result?.['success']) {
                this.swal_service.success({text: 'Паролата бе променета успешно'}).then(() => {
                    this.router.navigate(['/login']);
                });
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
