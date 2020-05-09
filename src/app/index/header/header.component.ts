import { SharedService } from './../../shared/service/shared.service';
import { UserService } from './../../user/service/user.service';
import { UserLogin } from '../../shared/model/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthGaurdService } from '../service/auth-gaurd.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [".sidebar-fixed{height:100vh;width:270px;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);z-index:1050;background-color:#fff;padding:0 1.5rem 1.5rem}.sidebar-fixed .list-group .active{-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);-webkit-border-radius:5px;border-radius:5px}.sidebar-fixed .logo-wrapper{padding:2.5rem}.sidebar-fixed .logo-wrapper img{max-height:50px}@media (min-width:1200px){.navbar,.page-footer,main{padding-left:270px}}@media (max-width:1199.98px){.sidebar-fixed{display:none}}"]
})
export class HeaderComponent implements OnInit {
  @ViewChild('frameLogin', { static: true }) frameLogin: ModalDirective;
  @ViewChild('frameSignin', { static: true }) frameSignin: ModalDirective;
  isLoginSubmit = false;
  isSigninSubmit = false;
  validatingLoginForm: FormGroup;
  validatingSigninForm: FormGroup;
  loginMess: string;
  signUpMess: string;
  constructor(
    public sharedService: SharedService,
    private router: Router, public loginService: AuthenticationService, private registerService: AuthenticationService,
    private authGaurdService: AuthGaurdService, public userService: UserService) { }

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
      this.signUpMess='Mật khẩu không khớp!'
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
          this.signUpMess='';
        } else {
          this.signUpMess='Tên đăng nhập đã tồn tại!'
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
          this.loginMess='Tên đăng nhập,mật khẩu không chính xác!'
        } else {
          this.loginMess='';
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
