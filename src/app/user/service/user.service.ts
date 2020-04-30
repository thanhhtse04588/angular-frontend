
import { Common } from '../../shared/common';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Contract } from 'src/app/shared/model/contract.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  insertOrder(insertForm: any): Observable<any> {
    return this.http.post(`${Common.urlBase}/orderlist/insert-order`, JSON.stringify(insertForm), Common.httpOptions);
  }

  editOrder(form): Observable<any> {
    return this.http.post(`${Common.urlBase}/orderlist/update-order`, JSON.stringify(form), Common.httpOptions);
  }

  getAllPost(userid): Observable<any> {
    return this.http.get(Common.urlBase + '/managepost/getallpost?userid=' + userid, Common.httpOptions);
  }

  getListOrderByUserID(userID): Observable<any> {
    return this.http.get(Common.urlBase + '/orderlist/get-order-by-userid?userID=' + userID, Common.httpOptions);
  }


  updateStatusPlace(placeID, statusID) {
    return this.http.post(Common.urlBase + '/managepost/change-status-place' + '?placeID=' + placeID + '&statusPlaceID=' + statusID,
     Common.httpOptions);
  }

  getPostForm(placeID): Observable<any> {
    return this.http.get(`${Common.urlBase}/api/cp/places/fillupdate?placeid=${placeID}`, Common.httpOptions);
  }

  updatePlace(form): Observable<any> {
    return this.http.post(`${Common.urlBase}/api/cp/places/update`, JSON.stringify(form), Common.httpOptions);
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
      Common.httpOptions);
  }
}
