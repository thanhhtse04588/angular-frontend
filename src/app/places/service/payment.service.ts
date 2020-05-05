import { Observable } from 'rxjs';
import { Common, _httpOptions } from './../../shared/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) { }

  completePayment(payment): Observable<any> {
    return this.http.post(`${Common.urlBase}/payment/insert-payment`, JSON.stringify(payment), _httpOptions);
  }

  getAllPayment(): Observable<any> {
    return this.http.get(`${Common.urlBase}/payment/getallpayment`);
  }

  getPaymentByUserID(id: number): Observable<any> {
    return this.http.get(`${Common.urlBase}/payment/getpaymentbyuserid?userID=${id}`);
  }

}
