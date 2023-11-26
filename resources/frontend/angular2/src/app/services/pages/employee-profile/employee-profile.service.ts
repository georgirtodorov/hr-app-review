import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlBuilderService} from '../../helpers/url-builder/url-builder.service'

@Injectable({
    providedIn: 'root'
})
export class EmployeeProfileService {

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }

    public getEmployee(user): Observable<any> {
        return this.http.get(this.url.api_url + '/employee/' + user);
    }

    public getCurrentEmployee(){

    }
}
