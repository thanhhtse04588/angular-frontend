import { Common } from '../../shared/common';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }



  getAllRole(): Observable<any> {
    return this.http.get(`${this.baseUrl}/roleofplace/getallrole`);
  }

  getAllStatistic(): Observable<any> {
    return this.http.get(`${this.baseUrl}/districtdb/getalldistrict`);
  }

  getPlacesBySearchCondition(searchCondition): Observable<any>{
    return this.http.post(`${this.baseUrl}/api/cp/places/search-page`, JSON.stringify(searchCondition),  Common.httpOptions)

  }

  getCountSearch(searchCondition): Observable<number>{
    return this.http.post<number>(`${this.baseUrl}/api/cp/places/count-search-result`, JSON.stringify(searchCondition),  Common.httpOptions)

  }





}
