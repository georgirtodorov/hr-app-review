import {NgModule} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {SearchEmployeesPipe} from '../pipes/pages/search-employees.pipe';
import {SearchFirstNamePipe} from '../pipes/pages/search-first-name.pipe';
import {SearchLastNamePipe} from '../pipes/pages/search-last-name.pipe';
import {SearchPositionPipe} from '../pipes/pages/search-position.pipe';
import {SearchLocationPipe} from '../pipes/pages/search-location.pipe';
import {SearchDepartmentPipe} from '../pipes/pages/search-department.pipe';
import {PaginationPipe} from '../pipes/pages/pagination.pipe';
import {StartDatePipe} from '../pipes/pages/start-date.pipe';
import {EndDatePipe} from '../pipes/pages/end-date.pipe';
import {SortDataPipe} from '../pipes/pages/sort-data.pipe';
import {SearchTextPipe} from '../pipes/pages/search-text.pipe';
import {FormatDisplayedDatePipe} from '../pipes/pages/format-displayed-date.pipe';

@NgModule({
    imports: [],
    declarations: [
        SearchEmployeesPipe,
        SearchFirstNamePipe,
        SearchLastNamePipe,
        SearchPositionPipe,
        SearchLocationPipe,
        SearchDepartmentPipe,
        PaginationPipe,
        StartDatePipe,
        EndDatePipe,
        FormatDisplayedDatePipe,
        SearchTextPipe,
        SortDataPipe,
    ],
    exports: [
        SearchEmployeesPipe,
        SearchFirstNamePipe,
        SearchLastNamePipe,
        SearchPositionPipe,
        SearchLocationPipe,
        SearchDepartmentPipe,
        PaginationPipe,
        StartDatePipe,
        EndDatePipe,
        FormatDisplayedDatePipe,
        SearchTextPipe,
        SortDataPipe,
    ],
    providers: [
        DatePipe,
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    ],
})
export class PipesModule {
}
