import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// Services //
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service'

@Injectable({
    providedIn: 'root'
})
export class AbsencesArchiveService {

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }

    private api_url = this.url.api_url + '/absences-archive/';

    public get(): Observable<any> {
        return this.http.get(this.api_url);
    }

    public getCurrentUser(): Observable<any> {
        return this.http.get(this.api_url + 'create');
    }

    public add(absence): Observable<any> {
        return this.http.post(this.api_url, absence);
    }

    public edit(absence): Observable<any> {
        let id = absence.id
        return this.http.put<any>(this.api_url + id, absence);
    }

    public delete(id: number): Observable<any> {
        return this.http.delete<any>(this.api_url + id);
    }

    public export() {
        return this.http.get(this.api_url + 'export');
    }
}
