import { UserLogin } from './../../class/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('frameLogin', { static: true }) frameLogin: ModalDirective;
  @ViewChild('frameSignin', { static: true }) frameSignin: ModalDirective;

  validatingLoginForm: FormGroup
  validatingSigninForm: FormGroup
  validateLogin = false

  constructor(private router: Router, public loginService: AuthenticationService, private registerService: AuthenticationService) { }

  ngOnInit(): void {

    this.validatingLoginForm = new FormGroup({
      loginFormModalUsername: new FormControl('', Validators.required),
      loginFormModalPassword: new FormControl('', [Validators.required]),
    });

    this.validatingSigninForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      confirmPasswrd: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)])
    });
  }

  doSignup() {

    if (this.validatingSigninForm.invalid) {
      alert("Thông tin không hợp lệ!")
      return;
    } else if (this.password.value !== this.confirmPasswrd.value) {
      alert("Mật khẩu không khớp!")
      return;
    }

    this.registerService.register(this.validatingSigninForm.value).subscribe(
      data => {
        if (data) {
          alert("Đăng ký tài khoản thành công!")
          this.router.navigate(["home"])
          this.frameSignin.hide()
          //auto login
          this.loginService.authenticate(this.username.value, this.password.value).subscribe(
            (data: UserLogin) => {
              try {
                this.loginService.setSessionLoggedIn(data)
              } catch (error) {
                console.log(error)
                this.router.navigate(["error"])
              }
            }, error => {
              console.log(error)
            })

        } else {
          alert("Tên đăng nhập đã tồn tại! Vui lòng nhập lại! ")
        }
      }, error => {
        console.log(error)
      }
    )
  }


  checkLogin() {
    this.loginService.authenticate(this.loginFormModalUsername.value, this.loginFormModalPassword.value).subscribe(
      (data: UserLogin) => {
        if (data.message === "401") {
          alert("Tên đăng nhập hoặc mật khẩu không chính xác!")
          return
        }
        try {
          this.loginService.setSessionLoggedIn(data)
        } catch (error) {
          console.log(error)
          this.router.navigate(["error"])
        } finally {
          this.frameLogin.hide()
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  // showLoginModal() {
  //   this.frameSignin.show()
  // }

  doLogOut() {
    this.loginService.logOut()
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

  getNameUser() {
    return sessionStorage.getItem("name");
  }
  getShortNameUser() {
    return sessionStorage.getItem("name").substring(0, 4);
  }

  get loginFormModalUsername() {
    return this.validatingLoginForm.get('loginFormModalUsername');
  }

  get loginFormModalPassword() {
    return this.validatingLoginForm.get('loginFormModalPassword');
  }

}
