import { ModalDirective } from 'angular-bootstrap-md';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  loginModal: ModalDirective;
  constructor(private router: Router,
    private authService: AuthenticationService,) { }
  setModal(mobal: ModalDirective) {
    this.loginModal = mobal;
  }

  showModal() {
    this.loginModal.show();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ) {
    if (this.authService.isUserLoggedIn())
      return true;
    this.showModal();
    return false;

  }

}