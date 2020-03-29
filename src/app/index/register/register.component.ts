
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private registerService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    let status = this.registerService.register(this.registerForm.value).subscribe(
      (result: number) => {
        if (result) {
          alert("Đăng ký tài khoản thành công!")
          this.router.navigate(['login']);
        } else {
          alert("Tên đăng nhập đã tồn tại! Vui lòng nhập lại! ")
        }
      }
    )
  }
}

