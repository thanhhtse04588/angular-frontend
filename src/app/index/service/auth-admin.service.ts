import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService implements CanActivate {

  constructor(private router: Router,
    private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ) {
    if (this.authService.isUserLoggedIn()){
      if(this.authService.isAdmin()) return true;

      this.router.navigate(['places']);
      return false
    }
    this.router.navigate(['user/login']);
    return false;

  }

}