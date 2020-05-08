import { Common,_httpOptions } from '../../shared/common';
import { UserLogin, User, UserMail } from '../../shared/model/user.model';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, BehaviorSubject, concat } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  user$: Observable<UserMail>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore, ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    // login gmail
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<UserMail>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));

  }

  register(registerData: any): Observable<any> {
    return this.http.post(`${Common.urlBase}/user/register `, JSON.stringify(registerData),  _httpOptions);
  }
  authenticate(uname, upass) {
    return this.http.post<UserLogin>(`${Common.urlBase}/user/login?uname=${uname}&upass=${upass}`,  _httpOptions).pipe(
      map(data => {
        this.setSessionLogin(data.u);
        return data;
      })
    );
  }
  setSessionLogin(currentUser: User) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.currentUserSubject.next(currentUser);
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isUserLoggedIn() {
    return this.currentUserValue ? true : false;
  }
  isAdmin() {
    return this.currentUserValue?.roleID === Common.roleAdmin;
  }

  logOut() {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.signOut();
    this.router.navigate(['places']);
  }

  // login with gmail
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    const signUp$ = this.register({
      firstName: credential.user.displayName,
      lastName: '',
      username: credential.user.email,
      password: credential.user.uid
    });
    const logIn$ = this.authenticate(credential.user.email, credential.user.uid);
    concat(signUp$, logIn$).subscribe();
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
  }


  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<UserMail> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data, { merge: true });

  }
}
