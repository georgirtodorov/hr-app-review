import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, timer, concat, debounceTime} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';

// Services //
import {UrlBuilderService} from "../url-builder/url-builder.service";

@Injectable({
    providedIn: 'root'
})
export class UserPermissionsService {

    private cache: Observable<string[]>;
    private api_url = this.url.api_url + '/user-permissions';

    constructor(
        private http: HttpClient,
        private url: UrlBuilderService
    ) {
    }

    get(): Observable<string[]> {
        if (!this.cache) {
            this.cache = this.http.get<any>(this.api_url).pipe(
                map((response: any) => response.data),
                shareReplay({ refCount: true, bufferSize: 1 }),
                debounceTime(500) // Add a debounce time here to ensure the request is not made too frequently
            );
        }
        return this.cache;
    }

    // This function fetches the authenticated user's roles and permissions from the backend
    // get(): Observable<any> {
    //     return this.http.get<any>(this.api_url)
    //         .pipe(map(response => response.data));
    // }

    // This function checks if the authenticated user has a particular permission
    hasPermission(permission_name: string): Observable<boolean> {
        // Cache the result for 1 minute
        const cacheTime = 60 * 1000; // 1 minute
        const cache$ = this.get().pipe(
            map(permissions => permissions.includes(permission_name)),
            shareReplay({ refCount: true, bufferSize: 1 })
        );
        return concat(cache$, timer(cacheTime).pipe(switchMap(() => cache$)));
    }

    // This function checks if the authenticated user has any of the specified permissions
    hasSomePermission(permission_names: string[]): Observable<boolean> {
        // Cache the result for 1 minute
        const cacheTime = 60 * 1000; // 1 minute
        const cache$ = this.get().pipe(
            map(permissions => permissions.some(permission => permission_names.includes(permission))),
            shareReplay({ refCount: true, bufferSize: 1 })
        );
        return concat(cache$, timer(cacheTime).pipe(switchMap(() => cache$)));
    }

}
