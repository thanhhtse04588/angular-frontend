import { Common } from './../class/common';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
constructor(private http: HttpClient) { }
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
getAllChecking(): Observable<any>{
  return this.http.get(`${Common.urlBase}/managechecking/get-all-checking`)
}
changeStatusChecking(data): Observable<any>{
  console.log(JSON.stringify(data))
  return this.http.post(`${Common.urlBase}/checkinglist/change-status-checking`,JSON.stringify(data),this.httpOptions)
}

changeStatusOrder(data): Observable<any>{
  console.log(JSON.stringify(data))
  return this.http.post(`${Common.urlBase}/orderlist/change-status-order`,JSON.stringify(data),this.httpOptions)
}

getAllOrder(): Observable<any>{
  return this.http.get(`${Common.urlBase}/manageorder/get-all-order`)
}
}
