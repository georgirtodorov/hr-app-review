import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {ProfileComponent} from './profile.component';
import {ProfileDialogComponent} from './dialog/profile-dialog.component';
import {ProfileDataComponent} from './profile-data/profile-data.component';
import {ProfileActionsComponent} from './actions/profile-actions.component';
import {ProfileAbsenceModule} from './absence/profile-absence.module';

//Import Angular Forms and Materials//
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
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
import {PipesModule} from '../../../pipes/pipes.module';
import { PictureComponent } from './picture/picture.component';
import {DirectivesModule} from "../../../directives/directives.module";
import { SalaryComponent } from './salary/salary.component';



@NgModule({
    declarations: [
        ProfileComponent,
        ProfileDialogComponent,
        ProfileDataComponent,
        ProfileActionsComponent,
        PictureComponent,
        SalaryComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        DirectivesModule,
        ProfileAbsenceModule,

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
        MatChipsModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatSortModule,
        FormsModule,
        NgOptimizedImage,

    ],
    exports: [
        ProfileDialogComponent
    ]
})
export class ProfileModule {
}
