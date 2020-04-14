import { Common } from './../../class/common';


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private baseUrl = 'http://localhost:8080/api/cp/places';

  constructor(private http: HttpClient) { }
  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  getPlacesTop6List(): Observable<any> {
    return this.http.get(`${this.baseUrl}/top6`)
      .pipe(
        retry(1)
      )
  }

  getPlaceDetail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
      .pipe(
        retry(1)
      )
  }
  getImageListByPlaceID(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/images/${id}`)
      .pipe(
        retry(1)
      )
  }
  getStatusByPlaceID(placeid): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/checkplace?placeid=${placeid}`)
      .pipe(
        retry(1)
      )
  }

  insertPlace(form): Observable<any> {
    return this.http.post(`${this.baseUrl}/insert-places`, JSON.stringify(form), this.httpOptions)
      .pipe(
        retry(1)
      )
  }

  getWardIDByDistrictID(id): Observable<any> {
    return this.http.get(`${Common.urlBase}/warddb/getallwardbydistrict?districtid=${id}`)
      .pipe(
        retry(1)
      )
  }

  getStreetIDByDistrictID(id): Observable<any> {
    return this.http.get(`${Common.urlBase}/street/getstreetbydistrict?districtid=${id}`)
      .pipe(
        retry(1)
      )
  }

  getCountOrderPendingByPlaceID(id): Observable<any>{
    return this.http.get(`${Common.urlBase}/manageorder/count-order-pending?placeID=${id}`)
  }




}
