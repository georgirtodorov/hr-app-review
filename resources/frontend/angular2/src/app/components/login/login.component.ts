import {Component, OnInit, EventEmitter, Output, Input, Inject} from '@angular/core';
import {UntypedFormGroup, UntypedFormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PlatformLocation} from '@angular/common';
import {UrlBuilderService} from "../../services/helpers/url-builder/url-builder.service";
import {LoginService} from "../../services/pages/login/login.service";
import {SwalService} from "../../services/helpers/swal/swal.service";

import { MatDialog } from '@angular/material/dialog';
import {ForgottenPasswordDialog} from "../pages/password/forgotten-password/forgotten-password.component";
import {Subscription} from "rxjs";
import {ResetPasswordDialog} from "../pages/password/reset-password/reset-password.component";
import {NavigateService} from "../../services/helpers/navigate/navigate.service";


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @Input() error: string | null;
    routeQueryParams$: Subscription;
    form: UntypedFormGroup;

    constructor(
        private fb: UntypedFormBuilder,
        private http: HttpClient,
        private platform_location: PlatformLocation,
        private router: Router,
        private url: UrlBuilderService,
        private login_service: LoginService,
        private swal_service: SwalService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private navigate_service: NavigateService,
    ) {
        this.subscribeRequestDialog();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
                email: '',
                password: ''
            }
        )
    }


    login() {
        const formData = this.form.getRawValue();
        this.login_service.login(formData).subscribe(result => {
            if (!result.token) {
                this.swal_service.error({text: 'Login error'});
                return;
            } else {
                console.log('Logging...')
                this.navigate_service.parseAndNavigate();
            }
        })
    }

    forgottenPassword()
    {
       this.dialog.open(ForgottenPasswordDialog, {
            data: {
                email: this.form.get('email').value
            }
        });
    }

    subscribeRequestDialog() {
        this.routeQueryParams$ = this.route.queryParams.subscribe(params => {
            if (params?.['reset-password']) {
                setTimeout(() => {
                    this.resetPassword(params?.['token'], params?.['email']);
                }, 1000);
            }
        });
    }

    resetPassword(token: string, email: string)
    {
        this.dialog.open(ResetPasswordDialog, {
            data: {
                token: token,
                email: email
            },
            // autoFocus: false,
            // disableClose: false,
            // minWidth: 500
        })
    }

    // ngOnDestroy() {
    //     this.routeQueryParams$.unsubscribe();
    // }
}
