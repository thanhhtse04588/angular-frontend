import { Common } from './../class/common';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CostOfLivingBillService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getAllBill(): Observable<any> {
    return this.http.get(`${Common.FAKESERVER}/COLBill`);
  }
  getBillDetailByBillID(billID: number): Observable<any> {
    return this.http.get(`${Common.FAKESERVER}/billDetail`);
  }
  getBillsByRenterID(renterID: number): Observable<any> {
    return this.http.get(`${Common.urlBase}`);
  }
  getBillsByOwnerID(ownerID: number): Observable<any> {
    return this.http.get(`${Common.urlBase}`);
  }
  updateBillDetail(billDetail): Observable<any> {
    return this.http.post(`${Common.urlBase}`,JSON.stringify(billDetail),this.httpOptions);
  }
  updateBillStatus(billID: number , billStatus: number): Observable<any> {
    return this.http.post(`${Common.urlBase}`,this.httpOptions);
  }


}
