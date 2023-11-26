import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// Services //
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service'

@Injectable({
    providedIn: 'root'
})
export class NotificationsService
{

    private api_url = this.url.api_url + '/notifications';

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }

    public get(): Observable<any> {
        return this.http.get(this.api_url);
    }

    public add(category: string ,action: string, email: string): Observable<any> {
        return this.http.post(this.api_url, {
            category: category,
            action: action,
            email: email
        });
    }

    public delete(id: number): Observable<any> {
        return this.http.delete<any>(this.api_url + '/' + id);
    }
}
