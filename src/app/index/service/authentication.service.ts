import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export class User {
  public status: number

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) {
  }
  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private baseUrl = 'http://localhost:8080/user/login';
  authenticate(uname, upass): Observable<any> {
    // let params = new HttpParams().set('uname',uname).set('upass',upass);
    return this.http.post<User>(`${this.baseUrl}?uname=${uname}&upass=${upass}`, this.httpOptions).pipe(
      map(
        userData => {
          let user = new User();
          user = userData;
          if (user.status === 200) { sessionStorage.setItem('username', uname) }
          else {
            sessionStorage.setItem('message', "Tên đăng nhập hoặc mật khẩu sai")
          }
          let authString = 'Basic ' + btoa(uname + ':' + upass)
          sessionStorage.setItem('basicauth', authString)
          return userData
        }
      )

    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}