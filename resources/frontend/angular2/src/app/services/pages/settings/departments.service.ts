import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// Services //
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service'

@Injectable({
    providedIn: 'root'
})
export class DepartmentsService {

    private api_url = this.url.api_url + '/departments';

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }

    public get(): Observable<any> {
        return this.http.get(this.api_url);
    }

    public add(department): Observable<any> {
        return this.http.post(this.api_url, department);
    }

    public edit(department): Observable<any> {
        let id = department.id;
        return this.http.put<any>(this.api_url + '/' + id, department);
    }

    public delete(department_id: number): Observable<any> {
        return this.http.delete<any>(this.api_url + '/' + department_id);
    }
}

