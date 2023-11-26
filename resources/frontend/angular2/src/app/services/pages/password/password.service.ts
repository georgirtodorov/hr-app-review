import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {tap} from 'rxjs';

// Services //
import {CookieService} from "ngx-cookie-service";
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service';
import {catchError} from "rxjs/operators";
import {BackendError} from "../../../classes/error/BackendError";
import {LoginService} from "../login/login.service";

@Injectable({
    providedIn: 'root'
})
export class PasswordService
{
    constructor(
        private http: HttpClient,
        private url: UrlBuilderService,
        private cookieService: CookieService,
        private login_service: LoginService
    )
    {
    }

    private api_url = this.url.api_url + '/password';

    forgottenPassword(data)
    {
        return this.http.post(this.api_url + '/forgotten', {email: data.email})
            .pipe(
                tap((response: any) => {
                }), catchError((e: HttpErrorResponse) => {
                        throw new BackendError(e)
                    }
                ));
    }

    resetPassword(data)
    {
        return this.http.post(this.api_url + '/reset', data)
            .pipe(
                tap((response: any) => {
                    if (response?.['success']) {
                        this.login_service.notAuthenticated();
                    }
                }), catchError((e: HttpErrorResponse) => {
                        throw new BackendError(e)
                    }
                ));
    }

    changePassword(data)
    {
        return this.http.post(this.api_url + '/change', data)
            .pipe(
                tap((response: any) => {
                    if (response?.['success']) {
                        this.login_service.notAuthenticated();
                    }
                }), catchError((e: HttpErrorResponse) => {
                        throw new BackendError(e)
                    }
                ));
    }

    forceChangePassword(data)
    {
        return this.http.post(this.api_url + '/force-change', data)
            .pipe(
                tap((response: any) => {
                    if (response?.['success'] && response?.['logout']) {
                        this.login_service.notAuthenticated();
                    }
                }), catchError((e: HttpErrorResponse) => {
                        throw new BackendError(e)
                    }
                ));
    }
}
