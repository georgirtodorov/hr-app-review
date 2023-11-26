import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileAbsenceComponent} from './profile-absence.component';
import { ProfileAbsenceListComponent } from './list/profile-absence-list.component';
import { ProfileAbsenceRequestComponent } from './request/profile-absence-request.component';

//Import Angular Forms and Materials//
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
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
import {PipesModule} from '../../../../pipes/pipes.module';
import { ShortProfileListComponent } from './short-profile-list/short-profile-list.component';
import {DialogAbsenceRequestComponent} from "./request/dialog-absence-request.component";


@NgModule({
    declarations: [
        ProfileAbsenceComponent,
        ProfileAbsenceListComponent,
        ProfileAbsenceRequestComponent,
        DialogAbsenceRequestComponent,
        ShortProfileListComponent,


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

    ],
    exports: [
        ProfileAbsenceComponent
    ]
})
export class ProfileAbsenceModule {
}
