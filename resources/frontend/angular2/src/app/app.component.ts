import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

// Services //
import {UrlBuilderService} from "./services/helpers/url-builder/url-builder.service";
import {NavigateService} from "./services/helpers/navigate/navigate.service";
import {CookieService} from "ngx-cookie-service";
import {LoginService} from "./services/pages/login/login.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public user;
    private api_url = this.url.api_url + '/users/'

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService,
        private router: Router,
        private navigate_service: NavigateService,
        private cookie_service: CookieService,
        private login_service: LoginService
    ) {
    }

    ngOnInit(): void {
        this.navigate_service.setNavigationUrl();
        // this.http.get(this.api_url + 'me', {}).subscribe((result: any) => {
        //         if (!result || result.error === 'Unauthenticated.') {
        //             this.login_service.notAuthenticated();
        //             setTimeout(() => this.router.navigate(['/login']), 200);
        //         }
        //     },
        //     err => {
        //         console.log('app.component')
        //         console.log(err)
        //         this.login_service.notAuthenticated();
        //         setTimeout(() => this.router.navigate(['/login']), 200);
        //     }
        // );


    }
}
