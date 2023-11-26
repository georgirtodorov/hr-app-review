import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {
    ResetPasswordComponent,
    ResetPasswordDialog
} from "./reset-password/reset-password.component";
import {
    ForgottenPasswordComponent,
    ForgottenPasswordDialog
} from "./forgotten-password/forgotten-password.component";
import {
    ChangePasswordComponent,
    ChangePasswordDialog
} from "./change-password/change-password.component";
import {
    ForceChangePasswordComponent,
    ForceChangePasswordDialog
} from "./force-change/force-change-password.component";


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
    ],
    declarations: [
        ForgottenPasswordComponent,
        ForgottenPasswordDialog,
        ResetPasswordComponent,
        ResetPasswordDialog,
        ChangePasswordDialog,
        ChangePasswordComponent,
        ForceChangePasswordComponent,
        ForceChangePasswordDialog,

    ],
    exports: [
        ForgottenPasswordDialog,
        ResetPasswordDialog,
        ChangePasswordDialog,
        ForceChangePasswordDialog,
    ],
    providers: [],
})
export class PasswordModule
{
}
