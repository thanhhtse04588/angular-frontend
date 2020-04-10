import { UserLogin } from './../../class/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  validatingSigninForm: FormGroup
  validateLogin = false
  constructor(private _location: Location, private router: Router, public loginService: AuthenticationService, private registerService: AuthenticationService) { }
  ngOnInit(): void {
    if (this.loginService.isUserLoggedIn()) {
      this.router.navigate(["places"])
    }

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
          this.router.navigate(["places"])
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
}
