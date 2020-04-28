import { Contract } from './../renter-contract/renter-contract.component';
import { Common } from './../../class/common';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { retry, map } from 'rxjs/operators';
// import 'rxjs/add/operator/toPromise'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  insertOrder(insertForm: any): Observable<any> {
    return this.http.post(`${Common.urlBase}/orderlist/insert-order`, JSON.stringify(insertForm), this.httpOptions)
      .pipe(
        retry(1)
      )
  }

  editOrder(form) : Observable<any> {
    return this.http.post(`${Common.urlBase}/orderlist/update-order`, JSON.stringify(form), this.httpOptions)
  }

  getAllPost(userid): Observable<any> {
    return this.http.get(Common.urlBase + "/managepost/getallpost?userid=" + userid, this.httpOptions)
  }

  getListOrderByUserID(userID): Observable<any> {
    return this.http.get(Common.urlBase + "/orderlist/get-order-by-userid?userID=" + userID, this.httpOptions)
  }


  updateStatusPlace(placeID, statusID) {
    return this.http.post(Common.urlBase + "/managepost/change-status-place" + "?placeID=" + placeID + "&statusPlaceID=" + statusID, this.httpOptions)
  }

  getPostForm(placeID): Observable<any>{
    return this.http.get(`${Common.urlBase}/api/cp/places/fillupdate?placeid=${placeID}`,this.httpOptions)
  }

  updatePlace(form): Observable<any> {
    return this.http.post(`${Common.urlBase}/api/cp/places/update`,JSON.stringify(form),this.httpOptions)
  }

  getContractByRenterID(id): Observable<any> {
    return this.http.get<Contract[]>(`${Common.urlBase}/managecontract/get-all-contract-renterID?renterID=${id}`).pipe(map(data=>{
      data.sort((a, b) => {
          return b.contractID - a.contractID;
       });
      return data;
   }))
  }

  getContractByOwnerID(id): Observable<any> {
    return this.http.get(`${Common.urlBase}/managecontract/get-all-contract-ownerID?ownerID=${id}`)
  }

  updateStatusContract(id: number,status: number,placeID: number): Observable<any>{
    return this.http.post(`${Common.urlBase}/contract/change-status?contractID=${id}&contractStatusID=${status}&placeID=${placeID}`,this.httpOptions)
  }
}
