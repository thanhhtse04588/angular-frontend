import { Common,_httpOptions } from '../shared/common';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
constructor(private http: HttpClient) { }

getAllChecking(): Observable<any> {
  return this.http.get(`${Common.urlBase}/managechecking/get-all-checking`);
}

getAllContract(): Observable<any> {
  return this.http.get(`${Common.urlBase}/managecontract/get-all-contract`);
}

changeStatusChecking(data): Observable<any> {
  return this.http.post(`${Common.urlBase}/checkinglist/change-status-checking`, JSON.stringify(data), _httpOptions);
}

changeStatusOrder(data): Observable<any> {
  return this.http.post(`${Common.urlBase}/orderlist/change-status-order`, JSON.stringify(data), _httpOptions);
}

getAllOrder(): Observable<any> {
  return this.http.get(`${Common.urlBase}/manageorder/get-all-order`);
}

getAllPlace(): Observable<any> {
  return this.http.get(`${Common.urlBase}/manageplace/get-all-place`);
}

createContract(data): Observable<any> {
return this.http.post(`${Common.urlBase}/contract/insert`, JSON.stringify(data), _httpOptions);
}

}
