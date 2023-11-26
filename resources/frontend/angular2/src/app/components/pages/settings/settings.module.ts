import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DepartmentsComponent} from './departments/departments.component';
import {LocationsComponent} from './locations/locations.component';
import {LocationComponent, LocationDialog} from "./locations/location/location.component";
import {PositionsComponent} from './positions/positions.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { PositionComponent, PositionDialog } from './positions/position/position.component';
import { AbsenceTypesComponent } from './absence-types/absence-types.component';
import { OfficialHolidaysComponent } from './official-holidays/official-holidays.component';
import { AbsencesArchiveComponent } from './absences-archive/absences-archive.component';
import { AbsencesArchiveRegisterComponent } from './absences-archive/archive-register/archive-register.component';
import {PipesModule} from '../../../pipes/pipes.module';
import { OfficialHolidaysListComponent } from './official-holidays/official-holidays-list/official-holidays-list.component';
import { AddHolidayComponent, EditHolidayDialog } from './official-holidays/add-holiday/add-holiday.component';


@NgModule({
    declarations: [
        DepartmentsComponent,
        LocationsComponent,
        LocationComponent,
        LocationDialog,
        PositionsComponent,
        PositionComponent,
        PositionDialog,
        AbsenceTypesComponent,
        OfficialHolidaysComponent,
        AbsencesArchiveComponent,
        AbsencesArchiveRegisterComponent,
        OfficialHolidaysListComponent,
        AddHolidayComponent,
        EditHolidayDialog
    ],
    imports: [
        CommonModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatChipsModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        PipesModule,
        MatDatepickerModule,
        MatListModule,
        MatButtonModule
    ],
    exports: [
        DepartmentsComponent,
        LocationsComponent,
        PositionsComponent,
        AbsenceTypesComponent,
        AbsencesArchiveComponent,
        AbsencesArchiveRegisterComponent,
        OfficialHolidaysComponent,
    ]
})
export class SettingsModule {
}
