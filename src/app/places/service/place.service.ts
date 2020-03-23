import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private baseUrl = 'http://localhost:8080/api/cp/places';

  constructor(private http: HttpClient) { }

  getPlacesTop6List(): Observable<any> {
    return this.http.get(`${this.baseUrl}/top6`);
  }

  getPlaceDetail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
