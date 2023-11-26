import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// Services //
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service'

@Injectable({
    providedIn: 'root'
})
export class SickLeaveService {

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }

    private api_url = this.url.api_url + '/sick-leave/';

    public get(): Observable<any> {
        return this.http.get(this.api_url);
    }

    public add(s_request): Observable<any> {
        return this.http.post(this.api_url, s_request);
    }

    public edit(s_request): Observable<any> {
        let id = s_request.id;
        return this.http.put<any>(this.api_url + id, s_request);
    }

    public delete(id: number): Observable<any> {
        return this.http.delete<any>(this.api_url + id);
    }

    public export(){
        return this.http.get(this.api_url + 'export');
    }
}
