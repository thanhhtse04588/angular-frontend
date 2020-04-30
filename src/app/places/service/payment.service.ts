import { Common } from './../../shared/common';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) { }

  completePayment(payment) {
    return this.http.post(`${Common.urlBase}/payment/insert-payment`, JSON.stringify(payment), Common.httpOptions);
  }

}
