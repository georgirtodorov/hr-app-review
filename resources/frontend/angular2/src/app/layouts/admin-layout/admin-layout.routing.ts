import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { EmployeesComponent } from '../../components/pages/employees/employees.component';
// import { EmployeeProfileComponent } from '../../components/pages/employee-profile/employee-profile.component';
import { ProfileComponent } from '../../components/pages/profile/profile.component';
import { SickLeaveComponent } from '../../components/pages/sick-leave/sick-leave.component';
import { AbsencesComponent } from '../../components/pages/absences/absences.component';
import { SettingsComponent } from '../../components/pages/settings/settings.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {AccessComponent} from "../../components/pages/access/access.component";
import {AbsenceComponent} from "../../components/pages/absence/absence.component";

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'profile',  component: ProfileComponent },
    { path: 'absence',  component: AbsenceComponent ,
        children: [ {
            path: 'upgrade',
            component: UpgradeComponent
        }]},
    { path: 'employees',  component: EmployeesComponent },
    { path: 'sick-leave',  component: SickLeaveComponent },
    { path: 'absences',  component: AbsencesComponent },
    { path: 'settings',  component: SettingsComponent },
    { path: 'access',  component: AccessComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
