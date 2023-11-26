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
import {ForceChangePassword} from "../../../../classes/pages/password/password.interface";
import {ForceChangePasswordForm} from "../../../../classes/pages/password/force-change-password-form";


@Component({
    selector: 'force-change-password-dialog',
    template: '<mat-dialog-content><force-change-password [user_id]="user_id"></force-change-password></mat-dialog-content>',
    styleUrls: ['./force-change-password.component.scss']
})

export class ForceChangePasswordDialog
{

    public user_id: number;

    constructor(
        public dialogRef: MatDialogRef<ForceChangePasswordDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    )
    {
        this.user_id = data.user_id ?? null
    }
}


@Component({
    selector: 'force-change-password',
    templateUrl: './force-change-password.component.html',
    styleUrls: ['./force-change-password.component.scss']
})
export class ForceChangePasswordComponent implements OnInit
{
    public forceChangePasswordForm: ForceChangePasswordForm<ForceChangePassword>
    @Input() user_id: number

    hide = true;
    hideConfirmation = true;
    get passwordInput() { return this.forceChangePasswordForm.formGroup.get('password'); }
    get passwordConfirmationInput() { return this.forceChangePasswordForm.formGroup.get('password_confirmation'); }

    constructor(
        private fb: UntypedFormBuilder,
        private http: HttpClient,
        private platform_location: PlatformLocation,
        private router: Router,
        private url: UrlBuilderService,
        private password_service: PasswordService,
        private swal_service: SwalService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<ForceChangePasswordDialog>,
    )
    {
        this.forceChangePasswordForm = new ForceChangePasswordForm<ForceChangePassword>(fb);
    }

    ngOnInit(): void
    {
        this.forceChangePasswordForm.formGroup.patchValue({
            user_id: this.user_id
        });
    }

    forceResetPassword()
    {
        this.forceChangePasswordForm.formGroup.markAllAsTouched();
        if (!this.forceChangePasswordForm.formGroup.valid) {
            return;
        }
        this.swal_service.loader().fire()
        this.password_service.forceChangePassword(this.forceChangePasswordForm.formGroup.getRawValue()).subscribe(result => {
            if (result?.['success']) {
                this.swal_service.success({text: 'Паролата бе променета'});
                if (result?.['logout']) {
                    this.closeDialog();
                    location.reload();
                }
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
