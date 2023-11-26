import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {catchError, tap} from "rxjs/operators";

// Services //
import {UrlBuilderService} from '../../../helpers/url-builder/url-builder.service'

// Classes //
import {UserAccessInterface} from "../../../../classes/pages/access/user/user-access.interface";

@Injectable({
    providedIn: 'root'
})
export class UserAccessService {

    private user: UserAccessInterface;
    public userChange = new Subject<any>();

    setUser(data: UserAccessInterface) {
        this.user = data;
        this.userChange.next(this.user)
    }

    getUser() {
        return this.user;
    }

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }

    private api_url = this.url.api_url + '/access/users';

    public get(): Observable<any> {
        return this.http.get(this.api_url)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                        throw error.error.error;
                    }
                )
            );
    }

    public add(user: UserAccessInterface): Observable<any> {
        return this.http.post(this.api_url, user)
            .pipe(
                tap((response: UserAccessInterface) => {
                    if (response.id) {
                        this.setUser(response);
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                        throw error.error.error;
                    }
                )
            );
    }

    revoke(user_id: number): Observable<any> {
        return this.http.delete(this.api_url + `/${user_id}`)
            .pipe(
                tap((response: UserAccessInterface) => {
                    if (response.id) {
                        this.setUser(response);
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                        throw error.error.error;
                    }
                )
            );
    }
}
