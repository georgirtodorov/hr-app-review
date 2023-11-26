import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
//Import Angular Forms and Materials//
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatNativeDateModule} from '@angular/material/core';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {PipesModule} from '../../../../pipes/pipes.module';
import {RegisterAbsenceComponent} from './../register-absence/register-absence.component';

import {CalendarComponent} from './calendar.component';
import {FilterDialogComponent} from './filter-dialog/filter-dialog.component';
import {AbsenceComponent} from "../absence.component";
import { CalendarControllerComponent } from './calendar-controller/calendar-controller.component';

@NgModule({
    declarations: [
        CalendarComponent,
        FilterDialogComponent,
        CalendarControllerComponent
    ],
    imports: [
        CommonModule,

        //Import Angular Forms and Materials//
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatDialogModule,
        MatExpansionModule,
        MatIconModule,
        MatMenuModule,
        MatChipsModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatSortModule,
        FormsModule,
    ],
    exports: [
        CalendarComponent,
        FilterDialogComponent
    ]
})
export class CalendarModule
{
}
