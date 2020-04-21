import { Common } from './../../class/common';

import { UserLogin } from './../../class/user';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<User>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
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
    try {
      sessionStorage.setItem("userID", data.u.userID.toString());
      sessionStorage.setItem("name", data?.ud?.name || "unknow");
      sessionStorage.setItem("role", data.u.roleID.toString());
    } catch (error) {
      console.log(error)
    }
  }

  isUserLoggedIn() {
    let userID = sessionStorage.getItem('userID')
    return !(userID === null)
  }
  isAdmin() {
    return +sessionStorage.getItem('role') == Common.roleAdmin
  }
  logOut() {
    sessionStorage.clear();
    this.signOut;
  }
  // register
  register(registerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register `, JSON.stringify(registerData), this.httpOptions)
  }
  // login with gmail
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    
    await this.register({
      firstName: credential.user.displayName,
      lastName: '',
      username: credential.user.email,
      password: credential.user.uid
    }).subscribe(null,null,()=>{
      this.authenticate(credential.user.email, credential.user.uid).subscribe(
        data => {
          console.log(data);
          
          this.setSessionLoggedIn(data)
          this.router.navigate(["/places"])
        })
    })

    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }


  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }
}
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
}