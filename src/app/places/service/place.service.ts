

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private baseUrl = 'http://localhost:8080/api/cp/places';
  private verybaseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

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
    return this.http.get(`${this.verybaseUrl}/warddb/getallwardbydistrict?districtid=${id}`)
      .pipe(
        retry(1)
      )
  }

  getStreetIDByWardID(id): Observable<any> {
    return this.http.get(`${this.verybaseUrl}/street/getstreetbyward?wardid=${id}`)
      .pipe(
        retry(1)
      )
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', 'http://localhost:8080/savefile', data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }

  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

}
