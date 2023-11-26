import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AbsenceComponent} from './absence.component';
import {AbsenceRequestComponent, AbsenceRequestDialog} from "./request/absence-request.component";
import {ProfileAbsenceRequestsComponent} from "./profile-requests/profile-absence-requests.component";
import {AbsenceListComponent} from "./list/absence-list.component";
import {PendingAbsenceRequestsComponent, PendingRequestsDialog} from "./pending-requests/pending-absence-requests.component";

//Import Angular Forms and Materials//
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {PipesModule} from '../../../pipes/pipes.module';
import { RegisterAbsenceComponent, RegisterAbsenceDialog } from './register-absence/register-absence.component';

import {CalendarModule} from "./calendar/calendar.module";




@NgModule({
    declarations: [
        AbsenceComponent,
        AbsenceRequestComponent,
        AbsenceRequestDialog,
        ProfileAbsenceRequestsComponent,
        AbsenceListComponent,
        PendingAbsenceRequestsComponent,
        PendingRequestsDialog,
        RegisterAbsenceComponent,
        RegisterAbsenceDialog

    ],
    imports: [
        CommonModule,
        PipesModule,

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

        //calendar test
        CalendarModule
    ],
    exports: [
        AbsenceComponent
    ]
})
export class AbsenceModule {
}
