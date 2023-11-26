import {Injectable} from '@angular/core';
import {Observable, forkJoin} from 'rxjs';
import {shareReplay, catchError} from 'rxjs/operators';

// Services //
import {EmployeesService} from '../../pages/employees/employees.service';
import {DepartmentsService} from '../../pages/settings/departments.service';
import {PositionsService} from '../../pages/settings/positions.service';
import {LocationsService} from '../../pages/settings/locations.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyDataService {

    constructor(
        private employees_service: EmployeesService,
        private departments_service: DepartmentsService,
        private positions_service: PositionsService,
        private locations_service: LocationsService
    ) {
    }

    private companyData$: Observable<any>;

    getCompanyData() {
        if (!this.companyData$) {
            this.companyData$ = forkJoin({
                employees: this.employees_service.getEmployees(),
                departments: this.departments_service.get(),
                positions: this.positions_service.get(),
                locations: this.locations_service.get()
            }).pipe(
                catchError(error => {
                    throw error;
                })
            )
        }
        return this.companyData$;
    }

    // code below is caching the response
    // private companyData$: Observable<any>;
    //
    // getCompanyData() {
    //     if (!this.companyData$) {
    //         this.companyData$ = forkJoin({
    //             employees: this.employees_service.getEmployees(),
    //             departments: this.departments_service.get(),
    //             positions: this.positions_service.get(),
    //             locations: this.locations_service.get()
    //         }).pipe(
    //             catchError(error => {
    //                 throw error;
    //             })
    //         ).pipe(
    //             shareReplay(1)
    //         );
    //     }
    //     return this.companyData$;
    // }
    // EOF caching the response

    // Code below is consistantly sending requests every 5 seconds
    // private readonly cacheExpirationTimeMs = 5000; // 5 seconds in milliseconds
    //
    // getCompanyData() {
    //     if (!this.companyData$) {
    //         this.companyData$ = timer(0, this.cacheExpirationTimeMs).pipe(
    //             switchMap(() =>
    //                 forkJoin({
    //                     employees: this.employees_service.getEmployees(),
    //                     departments: this.departments_service.get(),
    //                     positions: this.positions_service.get(),
    //                     locations: this.locations_service.get()
    //                 }).pipe(
    //                     catchError(error => {
    //                         throw error;
    //                     }),
    //                     shareReplay(1)
    //                 )
    //             )
    //         );
    //     }
    //     return this.companyData$;
    // }
    //end of sending requests every 5 seconds
}
