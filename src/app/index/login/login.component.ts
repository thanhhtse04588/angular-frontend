import { UserLogin } from './../../class/user';
import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validatingLoginForm: FormGroup
  validateLogin = false

  constructor(private _location: Location,private router: Router, public loginService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.loginService.isUserLoggedIn()){
      this.router.navigate(['home'])
    }
    this.validatingLoginForm = new FormGroup({
      loginFormModalUsername: new FormControl('', Validators.required),
      loginFormModalPassword: new FormControl('',Validators.required),
    });
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
        }
        this._location.back()
      },
      error => {
        console.log(error)
      }
    )
  }

  get loginFormModalUsername() {
    return this.validatingLoginForm.get('loginFormModalUsername');
  }

  get loginFormModalPassword() {
    return this.validatingLoginForm.get('loginFormModalPassword');
  }

}
