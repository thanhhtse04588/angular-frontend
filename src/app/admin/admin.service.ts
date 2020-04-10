import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 baseUrl ='http://localhost:8080'
constructor(private http: HttpClient) { }

getAllChecking(): Observable<any>{
  return this.http.get(`${this.baseUrl}/managechecking/get-all-checking`)
}
getAllOrder(): Observable<any>{
  return this.http.get(`${this.baseUrl}/manageorder/get-all-order`)
}
}
