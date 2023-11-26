import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

// Services //
import {CookieService} from "ngx-cookie-service";
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service';
import {NavigateService} from "../../helpers/navigate/navigate.service";
import {SwalService} from "../../helpers/swal/swal.service";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private isAuthenticatedValue: boolean = false;

    isAuthenticated(): boolean {
        return this.isAuthenticatedValue;
    }

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService,
        private cookie_service: CookieService,
        private navigate_service: NavigateService,
        private swal_service: SwalService,
        private router: Router,
    ) {
        this.isLoggedIn();
    }

    private isLoggedIn()
    {
        if (this.cookie_service.get('access_token')) {
            this.isAuthenticatedValue = true;
        }
    }

    public setAuthenticated(bool)
    {
        this.isAuthenticatedValue = bool
    }

    public login(data): Observable<any> {
        return this.http.post(this.url.api_url + '/login', {
            email: data.email,
            password: data.password,
        })
            .pipe(
                tap((response) => {
                    const {token, token_type} = response;
                    const expiresAt = new Date();
                    expiresAt.setHours(expiresAt.getHours() + 10); // Set cookie to expire in 10 hours
                    this.cookie_service.set('access_token', token, expiresAt, null, null, true, 'Strict');
                    this.cookie_service.set('access_token_type', token_type, expiresAt, null, null, true, 'Strict');
                    console.log(token)
                    console.log(token_type)
                    console.log(this.cookie_service.get('access_token'))
                    console.log(this.cookie_service.get('access_token_type'))
                    this.isAuthenticatedValue = true;
                })
            );
    }

    logout(): Observable<any> {
        return this.http.post(this.url.api_url + '/logout', {})
            .pipe(
                tap(() => {
                    // Remove the access_token and access_token_type cookies
                    this.isAuthenticatedValue = false;
                    this.cookie_service.delete('access_token');
                    this.cookie_service.delete('access_token_type');
                })
            );
    }

    notAuthenticated()
    {
        this.cookie_service.delete('access_token');
        this.cookie_service.delete('access_token_type');
        this.isAuthenticatedValue = false;
        this.router.navigate(['/login']);
    }
}
