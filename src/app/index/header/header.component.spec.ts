import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/index/service/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

const validUser = { loginUsername: "admin123", loginPassword: "admin123" }
const invalidUser = { loginUsername: "12345", loginPassword: "12345" }
const blankUser = {loginUsername: '',loginPassword: ''};
const loginServiceSpy = jasmine.createSpyObj('AuthenticationService', ['authenticate']);
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const testUserData = { id: 1, name: 'TekLoon'};
const loginErrorMsg = 'Invalid Login';
describe('Login Component Isolated Test', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    function updateForm(userName, userPassword) {
        component.validatingLoginForm.controls['loginUsername'].setValue(userName);
        component.validatingLoginForm.controls['loginPassword'].setValue(userPassword);
    }
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('component initial state', () => {
        expect(component.frameLogin).toBeDefined();
        expect(component.frameSignin).toBeDefined();
        expect(component.isLoginSubmit).toBeFalse();
        expect(component.isSigninSubmit).toBeFalse();
        expect(component.validatingLoginForm).toBeDefined();
        expect(component.validatingLoginForm.invalid).toBeTruthy();
        expect(component.validatingSigninForm).toBeDefined();
        expect(component.validatingSigninForm.invalid).toBeTruthy();
        expect(component.loginMess).toBeDefined();
        expect(component.signUpMess).toBeDefined();
    });

    it('submitted should be true when checkLogin()', () => {
        updateForm(invalidUser.loginUsername, invalidUser.loginPassword);
        expect(component.isLoginSubmit).toBeTruthy();
    })

    it('messLogin should be show when userName/passWord incorrect', () => {
        updateForm(invalidUser.loginUsername, invalidUser.loginPassword);
        expect(component.loginMess).toMatch('Tên đăng nhập,mật khẩu không chính xác!');
    })
    it('form value should update from when u change the input', (() => {
        updateForm(validUser.loginUsername, validUser.loginPassword);
        expect(component.validatingLoginForm.value).toEqual(validUser);
    }));

    it('Form invalid should be true when form is invalid', (() => {
        updateForm(invalidUser.loginUsername, invalidUser.loginPassword);
        expect(component.validatingLoginForm.invalid).toBeTruthy();
    }));
});


describe('Login Component Shallow Test', () => {

    let fixture: ComponentFixture<HeaderComponent>;
  
    function updateForm(userName, userPassword) {
        fixture.componentInstance.validatingLoginForm.controls['loginUsername'].setValue(userName);
        fixture.componentInstance.validatingLoginForm.controls['loginPassword'].setValue(userPassword);
    }
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          MatFormFieldModule,
          MatButtonModule,
          MatInputModule],
        providers: [
          {provide: AuthenticationService, useValue: loginServiceSpy},
          FormGroup,
          { provide: Router, useValue: routerSpy }
        ],
        declarations: [HeaderComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(HeaderComponent);
    }));
  
    it('created a form with username and password input and login button', () => {
      const usernameContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
      const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
      const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
      expect(usernameContainer).toBeDefined();
      expect(passwordContainer).toBeDefined();
      expect(loginBtnContainer).toBeDefined();
    });
  
    it('Display Username Error Msg when Username is blank', () => {
        updateForm(blankUser.loginUsername, validUser.loginPassword);
      fixture.detectChanges();
  
      const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
      expect(usernameErrorMsg).toBeDefined();
      expect(usernameErrorMsg.innerHTML).toContain('Không hợp lệ');
    });
  
    it('Display Password Error Msg when Password is blank', () => {
      updateForm(validUser.loginUsername,blankUser.loginPassword);
      fixture.detectChanges();

      const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');
      expect(passwordErrorMsg).toBeDefined();
      expect(passwordErrorMsg.innerHTML).toContain('Không hợp lệ');
    });
  
    it('Display Both Username & Password Error Msg when both field is blank', () => {
      updateForm('', '');
  
      const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
      const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');
  
      expect(usernameErrorMsg).toBeDefined();
      expect(usernameErrorMsg.innerHTML).toContain('Không hợp lệ');
  
      expect(passwordErrorMsg).toBeDefined();
      expect(passwordErrorMsg.innerHTML).toContain('Không hợp lệ');
    });
  
    it('When username is blank, username field should display red outline ', () => {
      updateForm(blankUser.loginUsername, validUser.loginPassword);
      fixture.detectChanges();
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      fixture.detectChanges();
  
      const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
      const usernameInput = inputs[0];
  
      expect(usernameInput.classList).toContain('is-invalid');
    });
  
    it('When password is blank, password field should display red outline ', () => {
      updateForm(validUser.loginUsername, blankUser.loginPassword);
      fixture.detectChanges();
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      fixture.detectChanges();
  
      const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
      const passwordInput = inputs[1];
  
      expect(passwordInput.classList).toContain('is-invalid');
    });
  });

  
  describe('Login Component Integrated Test', () => {
    let fixture: ComponentFixture<HeaderComponent>;
    let loginSpy;
    function updateForm(userEmail, userPassword) {
      fixture.componentInstance.validatingLoginForm.controls['loginUsername'].setValue(userEmail);
      fixture.componentInstance.validatingLoginForm.controls['loginPassword'].setValue(userPassword);
    }
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          MatFormFieldModule,
          MatInputModule
        ],
        providers: [
          {provide: AuthenticationService, useValue: loginServiceSpy},
          FormGroup,
          { provide: Router, useValue: routerSpy }
        ],
        declarations: [HeaderComponent],
      }).compileComponents();
  
      fixture = TestBed.createComponent(HeaderComponent);
      // router = TestBed.get(Router);
  
      loginSpy = loginServiceSpy.authenticate.and.returnValue(Promise.resolve(testUserData));
  
    }));
  
    it('loginService login() should called ', fakeAsync(() => {
      updateForm(validUser.loginUsername, validUser.loginPassword);
      fixture.detectChanges();
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      fixture.detectChanges();
  
      expect(loginServiceSpy.authenticate).toHaveBeenCalled();
    }));
  
  });