import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// Services //
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service'

@Injectable({
    providedIn: 'root'
})
export class AbsenceTypesService {

    private api_url = this.url.api_url + '/absence-types';

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }

    public get(): Observable<any> {
        return this.http.get(this.api_url);
    }

    public add(absence_type): Observable<any> {
        return this.http.post(this.api_url, absence_type);
    }

    public edit(absence_type): Observable<any> {
        let id = absence_type.id;
        return this.http.put<any>(this.api_url + '/' + id, absence_type);
    }

    public delete(absence_type: number): Observable<any> {
        return this.http.delete<any>(this.api_url + '/' + absence_type);
    }
}
