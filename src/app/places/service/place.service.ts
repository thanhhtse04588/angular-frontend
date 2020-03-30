import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private baseUrl = 'http://localhost:8080/api/cp/places';

  constructor(private http: HttpClient) { }

  getPlacesTop6List(): Observable<any> {
    return this.http.get(`${this.baseUrl}/top6`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getPlaceDetail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getImageListByPlaceID(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/images/${id}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getStatusByPlaceID(placeid): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/checkplace?placeid=${placeid}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
