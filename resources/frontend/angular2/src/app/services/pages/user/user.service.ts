import {Injectable} from '@angular/core';
import {catchError, shareReplay} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// Services //
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service'

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private api_url = this.url.api_url + '/users/';

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }

    public getCurrentUser(): Observable<any> {
        return this.http.get(this.api_url + 'me')
            .pipe(
                catchError(error => {
                    throw error;
                })
            ).pipe(
                shareReplay(1)
            );
    }

    public me(): Observable<any> {
        return this.http.get(this.api_url + 'me');
    }

    public get(): Observable<any> {
        return this.http.get(this.api_url);
    }

    public add(new_user): Observable<any> {
        return this.http.post(this.api_url + 'register', new_user).pipe(
            catchError(err => {
                throw (err.error.error
                );
            })
        );
    }

    public delete(id) {
        return this.http.delete(this.api_url + 'delete/' + id);
    }
}
