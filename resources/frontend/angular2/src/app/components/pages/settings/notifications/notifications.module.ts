import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';


import { ReactiveFormsModule} from '@angular/forms';
import { NotificationControllerComponent } from './notification-controller/notification-controller.component';


@NgModule({
	declarations: [
		NotificationsComponent,
  NotificationControllerComponent
	],
	exports: [
        NotificationsComponent
	],
    imports: [
        CommonModule,
        MatExpansionModule,
        MatIconModule,
        MatChipsModule,
        MatFormFieldModule,


        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule,



    ]
})
export class NotificationsModule { }
