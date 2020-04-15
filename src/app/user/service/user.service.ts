import { Common } from './../../class/common';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
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

  // public upload(formData) {
  //   return this.httpClient.post(this.SERVER_URL, formData, {  
  //       responseType: 'text'  
  //     });  
  // }
}
