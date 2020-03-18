import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private baseUrl = 'http://localhost:8080/cyber-place/api/cp01/places';

  constructor(private http: HttpClient) { }

  getPlacesTop6List(): Observable<any> {
    return this.http.get(`${this.baseUrl}/top6`);
  }
}
