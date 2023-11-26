import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import { MatDialogModule, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import {MyDateAdapter} from "./classes/dates/MyDateAdapter";




// @ts-ignore
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
      MatCardModule,
      MatInputModule,
      MatButtonModule,
      MatDialogModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatChipsModule,
      MatIconModule,
      MatTabsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MAT_DATE_LOCALE, useValue: 'bg' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
