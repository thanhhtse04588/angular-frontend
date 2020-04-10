
import { UserLogin } from './../../class/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }
  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private baseUrl = 'http://localhost:8080/user';
  authenticate(uname, upass) {
    return this.http.post<UserLogin>(`${this.baseUrl}/login?uname=${uname}&upass=${upass}`, this.httpOptions)
  }

  setSessionLoggedIn(data: UserLogin) {
    sessionStorage.setItem("userID", data.u.userID.toString());
    sessionStorage.setItem("name", data.ud.name);
    sessionStorage.setItem("role", data.u.roleID.toString());
  }

  isUserLoggedIn() {
    let userID = sessionStorage.getItem('userID')
    return !(userID === null)
  }

  logOut() {
    sessionStorage.clear()
  }

  // register
  register(registerData: any): Observable<any> {
    // return this.http.get(`${this.baseUrl}/api/cp/places/search`, searchCondition);
    return this.http.post(`${this.baseUrl}/register `, JSON.stringify(registerData), this.httpOptions)
  }
}