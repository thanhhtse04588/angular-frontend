import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:8080/paypal';
  constructor(private http: HttpClient) { }
  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  makePayment(price): Observable<any> {
    return this.http.post(this.baseUrl + '/pay?price=' + price, this.httpOptions,{responseType: 'text'})
  }

  completePayment(paymentId, payerId) {
    return this.http.post(this.baseUrl + '/pay/success?paymentId=' + paymentId + '&payerId=' + payerId, {}).pipe(
      map((response: Response) => response.json()));
  }

}
