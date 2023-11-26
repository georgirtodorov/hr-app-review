import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

// Services //
import {UrlBuilderService} from '../../../helpers/url-builder/url-builder.service'

// Classes //
import {PermissionInterface} from "../../../../classes/pages/access/permissions/permission.interface";

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {
    private permission: PermissionInterface;
    public permissionChange = new Subject<any>();

    setPermission(data: PermissionInterface) {
        this.permission = data;
        this.permissionChange.next(this.permission);
    }

    deletePermission(id: number) {
        this.permissionChange.next({
            delete: true,
            id: id
        });
    }

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }

    private api_url = this.url.api_url + '/access/permissions';

    public get(): Observable<any> {
        return this.http.get(this.api_url + '/index')
            .pipe(
                catchError((error: HttpErrorResponse) => {
                        throw error.error.error;
                    }
                )
            );
    }

    public add(permission: PermissionInterface): Observable<any> {
        return this.http.post(this.api_url + '/store', {permission: permission})
            .pipe(
                tap((response: any) => {
                    if (response.id) {
                        this.setPermission(response);
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                        throw error.error.error;
                    }
                )
            );
    }

    public delete(id: number): Observable<any> {
        return this.http.delete(this.api_url + `/destroy/${id}`)
            .pipe(
                tap((response: boolean) => {
                    if (response) {
                        this.deletePermission(id);
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                        throw error.error.error;
                    }
                )
            );
    }
}
