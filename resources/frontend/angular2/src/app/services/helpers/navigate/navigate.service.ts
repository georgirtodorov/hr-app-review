import {Injectable} from '@angular/core';

// Services //
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Location} from "@angular/common";
import {LoginService} from "../../pages/login/login.service";

@Injectable({
    providedIn: 'root'
})
export class NavigateService
{

    private default_redirect: string = '/absence';

    constructor(
        private cookieService: CookieService,
        private router: Router,
        private location_service: Location,
        private login_service: LoginService
    )
    {
    }

    parseAndNavigate() {
        const storedUrl = this.cookieService.get('current_url');
        console.log('here`1');
        console.log(storedUrl);

        if (storedUrl) {
            console.log('here`2');
            const [path, queryParams] = storedUrl.split('?');

            if (path.includes('login')) {
                console.log('here`4');
                console.log(path);
                this.router.navigate([this.default_redirect]).then(() => {
                    console.log(this.login_service.isAuthenticated())
                    console.log('Navigation to default redirect complete.');

                }).catch(error => {
                    console.log(this.login_service.isAuthenticated())
                    console.error('Error navigating to default redirect:', error);
                });
            } else {
                console.log('here`5');
                console.log(path);
                this.router.navigate([path], { queryParams: this.buildParams(queryParams) }).then(() => {
                    console.log(this.login_service.isAuthenticated())
                    console.log('Navigation to specific path complete.');
                }).catch(error => {
                    console.log(this.login_service.isAuthenticated())
                    console.error('Error navigating to specific path:', error);
                });
            }
        } else {
            this.router.navigate([this.default_redirect], { replaceUrl: true }).then(() => {
                console.log(this.login_service.isAuthenticated())
                console.log('Navigation to default redirect complete.');
            }).catch(error => {
                console.log(this.login_service.isAuthenticated())
                console.error('Error navigating to default redirect:', error);
            });
        }
    }

    setNavigationUrl()
    {
        this.cookieService.set('current_url', this.location_service.path(), {expires: 60}); // Store the current URL in a cookie
    }

    buildParams(queryParams?)
    {
        if (!queryParams) {
            return {};
        }
        return queryParams.split('&').reduce((acc, param) => {
            const [key, value] = param.split('=');
            acc[key] = value;
            return acc;
        }, {});
    }
}
