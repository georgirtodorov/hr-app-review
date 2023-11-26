import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// Services //
import {UrlBuilderService} from '../url-builder/url-builder.service'

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private api_url = this.url.api_url + '/users/'

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }


    public getUser(): Observable<any> {
        return this.http.get(this.api_url + 'me');
    }

    public getUsers(): Observable<any> {
        return this.http.get(this.api_url);
    }

    public register(new_user): Observable<any> {
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
