import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './components/login/login.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpXsrfInterceptor} from "./services/helpers/http/http-xsrf-interceptor.service";
import {AuthInterceptor} from "./services/helpers/http/auth-interceptor.service";
import {AuthGuard} from "./classes/auth_guard";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        // redirectTo: 'dashboard',
        redirectTo: 'absence',
        pathMatch: 'full',
    }, {
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
        }], canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            // useHash: true
        })
    ],
    exports: [],
    providers: [
        CookieService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true}
    ]
})
export class AppRoutingModule {
}
