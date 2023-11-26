import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service'
import {AbsenceRequestForm} from "../../../classes/pages/profile/absence/request/absence-request-form";
import {
    AbsenceRequestApprovalStatus,
    AbsenceRequestInterface
} from "../../../classes/pages/profile/absence/request/absence-request.interface";


//test shared service
import { Subject } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {SwalService} from "../../helpers/swal/swal.service";
import {BackendError} from "../../../classes/error/BackendError";
//eof testing shared service



@Injectable({
    providedIn: 'root'
})
export class AbsencesService {

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService,
        private swal_service: SwalService
    ) {
    }

    private api_url = this.url.api_url + '/absences/';

    public getCurrentUserData(): Observable<any> {
        return this.http.get(this.api_url + 'create');
    }

    public get(): Observable<any> {
        return this.http.get(this.api_url);
    }

    public addOld(absence): Observable<any> {
        return this.http.post(this.api_url, absence);
    }

    public editOld(absence): Observable<any> {
        let id = absence.id
        return this.http.put<any>(this.api_url + id, absence);
    }

    public delete(id: number): Observable<any> {
        return this.http.delete<any>(this.api_url + id);
    }

    public export() {
        return this.http.get(this.api_url + 'export');
    }

    public getRemainingDays(): Observable<any> {
        return this.http.get(this.api_url + 'remaining-days');
    }

    public getRemainingDaysCurrentUser(id): Observable<any> {
        return this.http.get(this.api_url + 'remaining-days/' + id);
    }

    //test shared service
    private data: any;
    private deleted_request;
    dataChange = new Subject<any>();
    dataDelete = new Subject<any>();

    setData(data: any) {
        this.data = data;
        this.dataChange.next(this.data);
    }

    deleteData(request){
        this.deleted_request = request;
        this.dataDelete.next(this.deleted_request);
    }

    getData() {
        return this.data;
    }
    //end of testing shared service


    //new controller
    public add(request: AbsenceRequestForm<AbsenceRequestInterface>): Observable<any>
    {
        return this.http.post(this.api_url + 'request', {'request': request})
            .pipe(
                tap((response: any) => {
                    if (response?.id) {
                        this.setData(response);
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                        throw new BackendError(error)
                    }
                )
            );
    }

    public edit(request: AbsenceRequestInterface): Observable<any> {
        const url = this.api_url + 'request/' + request.id; // Append request ID to the URL
        return this.http.put(url, {'request': request})
            .pipe(
                tap((response: AbsenceRequestInterface) => {
                    if (response?.id) {
                        this.setData(response);
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                        throw new BackendError(error)
                    }
                )
            );
    }

    public decline(request: AbsenceRequestInterface): Observable<any> {
        const url = this.api_url + 'request/decline';
        return this.http.post(url, {'request': request})
            .pipe(
                tap((response: any) => {
                    if (response?.id) {
                        this.setData(response);
                    }
                }), catchError((e: HttpErrorResponse) => {
                        throw new BackendError(e)
                    }
                ));
    }

    public approve(request: AbsenceRequestInterface): Observable<any>
    {
        const url = this.api_url + 'request/approve';
        return this.http.post(url, {'request': request})
            .pipe(
                tap((response: any) => {
                    if (response?.id) {
                        this.setData(response);
                    }
                }), catchError((e: HttpErrorResponse) => {
                        throw new BackendError(e)
                    }
                ));
    }

    public getAbsenceRequests(): Observable<any> {
        return this.http.get(this.api_url + 'request');
    }

    public getForEmployee(id): Observable<any> {
        return this.http.get(this.api_url + 'request/' + id);
    }

    getPending(): Observable<any> {
        return this.http.get(this.url.api_url + '/permission/test');
    }


}
