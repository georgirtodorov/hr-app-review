import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {LoginService} from "../services/pages/login/login.service"; // Replace with your authentication service


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private login_service: LoginService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        if (this.login_service.isAuthenticated()) {
            return true; // User is authenticated, allow access
        } else {
            this.router.navigate(['/login']); // Redirect to login page
        }
    }
}
