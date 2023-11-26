import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable, catchError, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private cookieService: CookieService,
        private router: Router
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const access_token = this.cookieService.get('access_token');
        const access_token_type = this.cookieService.get('access_token_type');
        if (access_token) {
            const auth_req = req.clone({
                headers: req.headers.set('Authorization', `${access_token_type} ${access_token}`)
            });
            return next.handle(auth_req).pipe(
                catchError((error) => {
                    if (error.status === 401 && error.error && error.error.error === 'Unauthenticated.') {
                        setTimeout(() => this.router.navigate(['/login']), 200);
                    }
                    return throwError(error);
                })
            );
        } else {
            return next.handle(req);
        }
    }
}
