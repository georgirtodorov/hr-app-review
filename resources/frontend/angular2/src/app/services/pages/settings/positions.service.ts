import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

// Services //
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service'
import {catchError, tap} from "rxjs/operators";
import {AbsenceRequestInterface} from "../../../classes/pages/profile/absence/request/absence-request.interface";
import {BackendError} from "../../../classes/error/BackendError";
import {PositionInterface} from "../../../classes/pages/settings/general/position/position.interface";

@Injectable({
    providedIn: 'root'
})
export class PositionsService
{

    private api_url = this.url.api_url + '/positions';

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

    public add(position): Observable<any>
    {
        return this.http.post(this.api_url, position)
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

    public edit(position): Observable<any>
    {
        let id = position.id;
        return this.http.put<any>(this.api_url + '/' + id, position)
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

    public delete(position_id: number): Observable<any>
    {
        return this.http.delete<any>(this.api_url + '/' + position_id)
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

