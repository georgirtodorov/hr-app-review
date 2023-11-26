import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service'
import {catchError, tap} from "rxjs/operators";
import {AbsenceRequestInterface} from "../../../classes/pages/profile/absence/request/absence-request.interface";
import {BackendError} from "../../../classes/error/BackendError";

@Injectable({
    providedIn: 'root'
})
export class EmployeesListService {

    private headers;

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }

    private api_url = this.url.api_url + '/employees-list';

    public getEmployees(): Observable<any> {
        return this.http.get(this.api_url);
    }

    public getEmployee(): Observable<any> {
        return this.http.get(this.api_url + '/create').pipe(
            tap((response: any) => {
            }),
            catchError((error: HttpErrorResponse) => {
                    throw new BackendError(error)
                }
            )
        );
    }

    public getEmployeeById(id): Observable<any> {
        return this.http.get(this.api_url + '/' + id);
    }

    public addEmployee(employee): Observable<any> {
        console.log(employee);
        return this.http.post(this.api_url, employee , {headers: this.headers});
    }

    public editEmployee(id, employee): Observable<any> {
        return this.http.put(this.api_url + '/' + id, employee , {headers: this.headers});
    }

    public deleteEmployee(id): Observable<any> {
        return this.http.delete(this.api_url + '/' + id , {headers: this.headers});
    }

    public edit(id, employee): Observable<any> {
        return this.http.put(this.api_url + '/' + id, employee , {headers: this.headers});
    }
}
