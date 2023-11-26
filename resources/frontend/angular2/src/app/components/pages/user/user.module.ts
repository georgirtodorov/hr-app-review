import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {RegisterDialogComponent} from './register/register-dialog.component';

//Import Angular Forms and Materials//
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        RegisterComponent,
        RegisterDialogComponent
    ],
    imports: [
        CommonModule,

        //Import Angular Forms and Materials//
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatDialogModule,
        MatIconModule,
        MatChipsModule,
        ReactiveFormsModule
    ],
    exports: [
        RegisterDialogComponent
    ]
})
export class UserModule {
}
