import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

// Services //
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service'
import {catchError, tap} from "rxjs/operators";
import {BackendError} from "../../../classes/error/BackendError";

@Injectable({
    providedIn: 'root'
})
export class LocationsService {

    private api_url = this.url.api_url + '/locations';
    dataChange = new Subject<any>();
    dataDeleted = new Subject<any>();
    dataAdded = new Subject<any>();

    changeData(data: any)
    {
        this.dataChange.next(data);
    }

    deleteData(data: any)
    {
        this.dataDeleted.next(data);
    }

    addData(data: any)
    {
        this.dataAdded.next(data);
    }

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    )
    {
    }

    public get(): Observable<any>
    {
        return this.http.get(this.api_url);
    }

    public add(location): Observable<any>
    {
        return this.http.post(this.api_url, location)
            .pipe(
                tap((response: any) => {
                    if (response?.id) {
                        this.addData(response);
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                        throw new BackendError(error)
                    }
                )
            );
    }

    public edit(location): Observable<any>
    {
        let id = location.id;
        return this.http.put<any>(this.api_url + '/' + id, location)
            .pipe(
                tap((response: any) => {
                    if (response?.id) {
                        this.changeData(response);
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                        throw new BackendError(error)
                    }
                )
            );
    }

    public delete(location_id: number): Observable<any>
    {
        return this.http.delete<any>(this.api_url + '/' + location_id)
            .pipe(
                tap((response: any) => {
                    if (response?.id) {
                        this.deleteData(response);
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                        throw new BackendError(error)
                    }
                )
            );
    }
}

