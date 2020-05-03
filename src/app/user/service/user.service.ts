
import { Common,_httpOptions } from '../../shared/common';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { Contract } from 'src/app/shared/model/contract.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  insertOrder(insertForm: any): Observable<any> {
    return this.http.post(`${Common.urlBase}/orderlist/insert-order`, JSON.stringify(insertForm), _httpOptions);
  }

  editOrder(form): Observable<any> {
    return this.http.post(`${Common.urlBase}/orderlist/update-order`, JSON.stringify(form), _httpOptions);
  }

  getAllPost(userid): Observable<any> {
    return this.http.get(Common.urlBase + '/managepost/getallpost?userid=' + userid, _httpOptions);
  }

  getListOrderByUserID(userID): Observable<any> {
    return this.http.get(Common.urlBase + '/orderlist/get-order-by-userid?userID=' + userID, _httpOptions);
  }


  updateStatusPlace(placeID, statusID) {
    return this.http.post(Common.urlBase + '/managepost/change-status-place' + '?placeID=' + placeID + '&statusPlaceID=' + statusID,
     _httpOptions);
  }

  getPostForm(placeID): Observable<any> {
    return this.http.get(`${Common.urlBase}/api/cp/places/fillupdate?placeid=${placeID}`, _httpOptions);
  }

  updatePlace(form): Observable<any> {
    return this.http.post(`${Common.urlBase}/api/cp/places/update`, JSON.stringify(form), _httpOptions);
  }

  getContractByRenterID(id): Observable<any> {
    return this.http.get<Contract[]>(`${Common.urlBase}/managecontract/get-all-contract-renterID?renterID=${id}`).pipe(map(data => {
      data.sort((a, b) => {
        return b.contractID - a.contractID;
      });
      return data;
    }));
  }

  getContractByOwnerID(id): Observable<any> {
    return this.http.get(`${Common.urlBase}/managecontract/get-all-contract-ownerID?ownerID=${id}`);
  }

  updateStatusContract(id: number, status: number, placeID: number): Observable<any> {
    return this.http.post(`${Common.urlBase}/contract/change-status?contractID=${id}&contractStatusID=${status}&placeID=${placeID}`,
      _httpOptions);
  }
}
