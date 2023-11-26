import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// Services //
import {UrlBuilderService} from '../../../helpers/url-builder/url-builder.service'

@Injectable({
    providedIn: 'root'
})
export class PictureService {

    private api_url = this.url.api_url + '/profile/picture';

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }

    public add(employee_id: number, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('employee_id', employee_id.toString()); // Make sure this matches your Laravel request
        formData.append('file', file);

        return this.http.post(this.api_url, formData);
    }
}
