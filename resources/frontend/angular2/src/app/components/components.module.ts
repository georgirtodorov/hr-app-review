import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {EmployeesComponent} from './pages/employees/employees.component';
import {LoginComponent} from './login/login.component';

import {SickLeaveComponent} from './pages/sick-leave/sick-leave.component';
import {RegisterSickLeaveComponent} from './pages/sick-leave/register-sick-leave/register-sick-leave.component';
import {AbsencesComponent} from './pages/absences/absences.component';
import {AbsenceComponent} from './pages/absences/absence/absence.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {SettingsModule} from './pages/settings/settings.module';
import {AccessModule} from './pages/access/access.module';
import {AbsenceModule} from "./pages/absence/absence.module";

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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {PipesModule} from '../pipes/pipes.module';
import {UserModule} from './pages/user/user.module';
import {ProfileModule} from './pages/profile/profile.module'

import {EmployeeProfileComponent} from './pages/employee-profile/employee-profile.component';
import {ProfileDialogComponent} from './pages/employee-profile/dialog/profile-dialog.component';
import {NotificationsModule} from "./pages/settings/notifications/notifications.module";
import {PasswordModule} from "./pages/password/password.module";
import {DirectivesModule} from "../directives/directives.module";



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatDialogModule,
        MatExpansionModule,
        MatIconModule,
        MatChipsModule,
        MatTabsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        SettingsModule,
        AccessModule,
        AbsenceModule,

        PipesModule,
        UserModule,
        ProfileModule,
        NotificationsModule,
        DirectivesModule,

        PasswordModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        EmployeesComponent,
        LoginComponent,
        SickLeaveComponent,
        RegisterSickLeaveComponent,
        AbsencesComponent,
        AbsenceComponent,
        SettingsComponent,
        EmployeeProfileComponent,
        ProfileDialogComponent,

    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        EmployeesComponent,
        LoginComponent,
        SickLeaveComponent,
        AbsencesComponent,
        SettingsComponent,
        EmployeeProfileComponent,
    ],
    providers: [],
})
export class ComponentsModule {
}
