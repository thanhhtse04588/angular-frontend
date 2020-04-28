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
    return this.http.get(`${Common.urlBase}/costofliving/getall30daysafter`);
  }
  getBillDetailByBillID(billID: number): Observable<any> {
    return this.http.get(`${Common.urlBase}/costofliving/getdetailbycolid?colID=${billID}`);
  }
  getBillsByRenterID(renterID: number): Observable<any> {
    return this.http.get(`${Common.urlBase}/costofliving/getbillbyrenterid?renterID=${renterID}`);
  }
  getBillsByOwnerID(ownerID: number): Observable<any> {
    return this.http.get(`${Common.urlBase}/costofliving/getbillbyownterid?ownerID=${ownerID}`);
  }
  updateBillDetail(billDetail): Observable<any>{
    return this.http.post(`${Common.urlBase}/costofliving/updatebilldetail`,JSON.stringify(billDetail),this.httpOptions);
  }
  updateBillStatus(billID: number , billStatus: number): Observable<any> {
    return this.http.post(`${Common.urlBase}/costofliving/changeStatusBill?colID=${billID}&billStatusID=${billStatus}`,this.httpOptions);
  }


}
