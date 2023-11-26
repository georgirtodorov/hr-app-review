import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

// Services //
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service';
import {Observable, Subject, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {BackendError} from "../../../classes/error/BackendError";
import {OfficialHolidaysInterface} from "../../../classes/pages/settings/official-holidays/official-holidays.interface";

@Injectable({
    providedIn: 'root'
})
export class OfficialHolidaysService
{

    private api_url = this.url.api_url + '/official-holidays';

    updateDataChange = new Subject<any>();

    updateData(data: any) {
        this.updateDataChange.next(data);
    }

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    )
    {
    }

    public get(): Observable<any>
    {
        return this.http.get(this.api_url)
            .pipe(
                tap((response: any) => {
                }), catchError((e: HttpErrorResponse) => {
                        throw new BackendError(e)
                    }
                ));
    }

    public store(holiday: OfficialHolidaysInterface): Observable<any>
    {
        return this.http.post(this.api_url, holiday)
            .pipe(
                tap((response: any) => {
                    if (response?.id) {
                        this.updateData({response});
                    }
                }), catchError((e: HttpErrorResponse) => {
                        throw new BackendError(e)
                    }
                ));
    }

    public update(holiday: OfficialHolidaysInterface, holiday_id): Observable<any>
    {
        return this.http.put(this.api_url + '/' + holiday_id, holiday)
            .pipe(
                tap((response: any) => {
                    if (response?.id) {
                        this.updateData(response);
                    }
                }), catchError((e: HttpErrorResponse) => {
                        throw new BackendError(e)
                    }
                ));
    }

    public delete(holiday_id: number): Observable<any>
    {
        return this.http.delete<any>(this.api_url + '/' + holiday_id)
            .pipe(
                tap((response: any) => {
                }), catchError((e: HttpErrorResponse) => {
                        throw new BackendError(e)
                    }
                ));
    }
}
