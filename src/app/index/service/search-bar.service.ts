import { Router } from '@angular/router';
import { SearchCondition } from './../../class/search-condition';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient,
    private router: Router) { }

  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getAllRole(): Observable<any> {
    return this.http.get(`${this.baseUrl}/roleofplace/getallrole`);
  }

  getAllStatistic(): Observable<any> {
    return this.http.get(`${this.baseUrl}/districtdb/getalldistrict`);
  }

  getPlacesBySearchCondition(searchCondition): Observable<any>{
    return this.http.post(`${this.baseUrl}/api/cp/places/search-page`, JSON.stringify(searchCondition), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getCountSearch(searchCondition): Observable<number>{
    return this.http.post<number>(`${this.baseUrl}/api/cp/places/count-search-result`, JSON.stringify(searchCondition), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  // getPlacesBySearchCondition(title: string,
  //   role_id: number,
  //   district_id: number,
  //   maxa: number,
  //   mina: number,
  //   maxp: number,
  //   minp: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/api/cp/places/search/
  //   ${title}/${role_id}/${district_id}/${maxa}/${mina}/${maxp}/${minp}`);
  // }

    // Error handling 
    handleError(error) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      this.router.navigate["home"]
      return throwError(errorMessage);
   }
}
