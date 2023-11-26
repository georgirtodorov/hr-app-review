import {Component, isDevMode, OnInit} from '@angular/core';
import {LoginService} from "../../services/pages/login/login.service";
import {SwalService} from "../../services/helpers/swal/swal.service";
import {Router} from "@angular/router";
import {UserPermissionsService} from "../../services/helpers/permissions/user-permissions.service";

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    // {path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: '' },
    {path: '/profile', title: 'Профил', icon: 'person', class: ''},
    {path: '/absence', title: 'Отпуск', icon: 'library_books', class: ''},
    {path: '/employees', title: 'Служители', icon: 'content_paste', class: ''},
    // { path: '/sick-leave', title: 'Болнични',  icon:'library_books', class: '' },
    // {path: '/absences', title: 'Отпуски', icon: 'library_books', class: ''},
    {path: '/settings', title: 'Настройки', icon: 'library_books', class: ''},
    {path: '/access', title: 'Достъп', icon: 'library_books', class: ''},
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    ASSETS_PATH: string = '/test/hr-app/public/assets/angular/assets/'
    menuItems: any[];

    public canManageAccesses: boolean = false;
    public canChangeSettings: boolean = false;
    public canManageEmployees: boolean = false;

    constructor(
        private user_permissions: UserPermissionsService,
        private login_service: LoginService,
        private swal_service: SwalService,
        private router: Router,
    ) {
        this.user_permissions.hasPermission('can_manage_accesses').subscribe(hasPermission => {
            this.canManageAccesses = hasPermission;
        }, error => {
            console.log('sidebar.component')
            console.log(error)
            setTimeout(() => this.router.navigate(['/login']), 200);
        });
        this.user_permissions.hasPermission('can_change_settings').subscribe(hasPermission => {
            this.canChangeSettings = hasPermission;
        })
        this.user_permissions.hasPermission('can_manage_employees').subscribe(hasPermission => {
            this.canManageEmployees = hasPermission;
        })
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (isDevMode()) {
            this.ASSETS_PATH = '/assets/'
        }
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    private getRoutes(): RouteInfo[] {

        return [
            // {path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
            // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
            // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
            // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
            // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
            // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
            // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
            // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: '' },
            {path: '/profile', title: 'Профил', icon: 'person', class: ''},
            {path: '/absence', title: 'Отпуск', icon: 'library_books', class: ''},
            {path: '/employees', title: 'Служители', icon: 'content_paste', class: ''},
            // { path: '/sick-leave', title: 'Болнични',  icon:'library_books', class: '' },
            // {path: '/absences', title: 'Отпуски', icon: 'library_books', class: ''},
            {path: '/settings', title: 'Настройки', icon: 'library_books', class: ''},
            {path: '/access', title: 'Достъп', icon: 'library_books', class: ''},
        ];
    }
    logout() {
        this.login_service.logout().subscribe(result => {
            this.swal_service.loader();
            if (result == 'success') {
                this.swal_service.loader().close();
                setTimeout(() => this.router.navigate(['/login']), 200);
                return;
            }
            this.swal_service.error({text: 'Logout error'});
        }, error => {
            this.swal_service.error({text: error.error.error});
        })
    }
}
