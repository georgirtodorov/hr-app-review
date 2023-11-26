import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

// Services //
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service'
import {catchError} from "rxjs/operators";
import {BackendError} from "../../../classes/error/BackendError";

@Injectable({
    providedIn: 'root'
})

export class SalariesService {

    private api_url = this.url.api_url + '/salaries';
    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }

    public getSalaries(): Observable<any> {
        return this.http.get(this.url.api_url + '/salaries');
    }

    public getSalary(employee_id: number): Observable<any> {
        return this.http.get(this.api_url + '/' + employee_id);
    }

    public setSalary(employee_id: number, salary: number): Observable<any> {

        return this.http.post(this.api_url , {employee_id: employee_id, salary: salary})
            .pipe(
                tap((response: any) => {
                }), catchError((e: HttpErrorResponse) => {
                        throw new BackendError(e)
                    }
                ));
    }
}
