
import { Common,_httpOptions } from '../../shared/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  constructor(private http: HttpClient) { }



  getAllRole(): Observable<any> {
    return this.http.get(`${Common.urlBase}/roleofplace/getallrole`);
  }

  getAllStatistic(): Observable<any> {
    return this.http.get(`${Common.urlBase}/districtdb/getalldistrict`);
  }

  getPlacesBySearchCondition(searchCondition): Observable<any>{
    return this.http.post(`${Common.urlBase}/api/cp/places/search-page`, JSON.stringify(searchCondition),  _httpOptions)

  }

  getCountSearch(searchCondition): Observable<number>{
    return this.http.post<number>(`${Common.urlBase}/api/cp/places/count-search-result`, JSON.stringify(searchCondition),  _httpOptions)

  }





}
