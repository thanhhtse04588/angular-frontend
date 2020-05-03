
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserLogin } from '../../shared/model/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthGaurdService } from '../service/auth-gaurd.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @ViewChild('frameLogin', { static: true }) frameLogin: ModalDirective;
  @ViewChild('frameSignin', { static: true }) frameSignin: ModalDirective;
  isLoginSubmit = false;
  isSigninSubmit = false;
  validatingLoginForm: FormGroup;
  validatingSigninForm: FormGroup;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router, public loginService: AuthenticationService, private registerService: AuthenticationService,
    private authGaurdService: AuthGaurdService) {}
    ngOnInit(): void {
      this.authGaurdService.setModal(this.frameLogin);
  
      this.validatingLoginForm = new FormGroup({
        loginFormModalUsername: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(6)]),
        loginFormModalPassword: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(6)]),
      });
      this.validatingSigninForm = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        lastName: new FormControl('', [Validators.maxLength(32)]),
        username: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(6)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
        confirmPasswrd: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)])
      });
    }
  
    doSignup() {
      if (this.password.value !== this.confirmPasswrd.value) {
        alert('Mật khẩu không khớp!');
        return;
      }
      this.isSigninSubmit = true;
      // tslint:disable-next-line: deprecation
      this.registerService.register(this.validatingSigninForm.value).subscribe(
        data => {
          if (data) {
            alert('Đăng ký tài khoản thành công!');
            this.frameSignin.hide();
            this.frameLogin.show();
          } else {
            alert('Tên đăng nhập đã tồn tại! Vui lòng nhập lại! ');
          }
        }, null, () => this.isSigninSubmit = false
      );
    }
  
  
    checkLogin() {
      this.isLoginSubmit = true;
      // tslint:disable-next-line: deprecation
      this.loginService.authenticate(this.loginFormModalUsername.value, this.loginFormModalPassword.value).subscribe(
        (data: UserLogin) => {
          if (data.message === '401') {
            alert('Tên đăng nhập hoặc mật khẩu không chính xác!');
          } else {
            if (this.loginService.isAdmin()) { this.router.navigate(['admin']); }
            this.frameLogin.hide();
          }
        }, null, () => this.isLoginSubmit = false
      );
    }
  
    get firstName() {
      return this.validatingSigninForm.get('firstName');
    }
    get lastName() {
      return this.validatingSigninForm.get('lastName');
    }
  
    get username() {
      return this.validatingSigninForm.get('username');
    }
  
    get password() {
      return this.validatingSigninForm.get('password');
    }
    get confirmPasswrd() {
      return this.validatingSigninForm.get('confirmPasswrd');
    }
  
    get loginFormModalUsername() {
      return this.validatingLoginForm.get('loginFormModalUsername');
    }
  
    get loginFormModalPassword() {
      return this.validatingLoginForm.get('loginFormModalPassword');
    }
  
  }
  