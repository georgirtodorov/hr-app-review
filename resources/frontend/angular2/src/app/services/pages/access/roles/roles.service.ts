import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

// Services //
import {UrlBuilderService} from '../../../helpers/url-builder/url-builder.service'

// Classes //
import {RoleInterface} from "../../../../classes/pages/access/roles/role.interface";
import {User} from "../../../../classes/pages/user/user.interface";

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    private role: RoleInterface;
    public roleChange = new Subject<any>();

    setRole(data: RoleInterface) {
        this.role = data;
        this.roleChange.next(this.role);
    }

    deleteRole(id: number) {
        this.roleChange.next({
            delete: true,
            id: id
        });
    }

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }

    private api_url = this.url.api_url + '/access/roles';

    public get(): Observable<any> {
        return this.http.get(this.api_url)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                        throw error.error.error;
                    }
                )
            );
    }

    public add(role: RoleInterface): Observable<any> {
        return this.http.post(this.api_url, {role: role})
            .pipe(
                tap((response: any) => {
                    if (response.id) {
                        this.setRole(response);
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                        throw error.error.error;
                    }
                )
            );
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.api_url + `/${id}`)
            .pipe(
                tap((response: boolean) => {
                    if (response) {
                        this.deleteRole(id);
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                        throw error.error.error;
                    }
                )
            );
    }

    public roleUsers(role_name: string, users: User[]): Observable<any> {
        return this.http.put(this.api_url + `/${role_name}`, {users: users})
            .pipe(
                tap((response: any) => {
                    if (response.id) {
                        this.setRole(response);
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                        throw error.error.error;
                    }
                )
            );
    }
}
