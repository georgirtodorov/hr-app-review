// Modules //
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayModule} from '@angular/cdk/overlay';
import {AccessComponent} from './access.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import {MatChipsModule} from "@angular/material/chips";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {PipesModule} from "../../../pipes/pipes.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from "@angular/material/checkbox";

// Components //
import {PermissionsComponent} from './permissions/permissions.component';
import {RolesComponent} from './roles/roles.component';
import {UserPermissionsComponent} from './user-permissions/user-permissions.component';
import {EditPermissionComponent} from './permissions/edit-permission/edit-permission.component';
import {AddRoleComponent} from './roles/add-role/add-role.component';
import {RolePermissionsComponent} from './roles/role-permissions/role-permissions.component';
import {RoleUsersComponent} from './roles/role-users/role-users.component';
import {
    EditRolePermissionsComponent
} from './roles/role-permissions/edit-role-permissions/edit-role-permissions.component';
import {EditRoleUsersComponent} from './roles/role-users/edit-role-users/edit-role-users.component';
import {
    RolePermissionsDialogComponent
} from './roles/role-permissions/role-permissions-dialog/role-permissions-dialog.component';
import {AddPermissionComponent} from './permissions/add-permission/add-permission.component';
import {EditUserPermissionsComponent} from './user-permissions/edit-user-permissions/edit-user-permissions.component';
import {AddUserPermissionsComponent} from './user-permissions/add-user-permissions/add-user-permissions.component';

@NgModule({
    declarations: [
        AccessComponent,
        PermissionsComponent,
        RolesComponent,
        UserPermissionsComponent,
        EditPermissionComponent,
        AddRoleComponent,
        RolePermissionsComponent,
        RoleUsersComponent,
        EditRolePermissionsComponent,
        EditRoleUsersComponent,
        RolePermissionsDialogComponent,
        AddPermissionComponent,
        EditUserPermissionsComponent,
        AddUserPermissionsComponent,
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
        MatTooltipModule,
        PipesModule,
        MatDatepickerModule,
        MatListModule,
        MatButtonModule,
        OverlayModule,
        MatCheckboxModule
    ]
})
export class AccessModule {
}
