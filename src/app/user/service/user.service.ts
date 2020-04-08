
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  insertOrder(insertForm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orderlist/insert-order`, JSON.stringify(insertForm), this.httpOptions)
      .pipe(
        retry(1)
      )
  }

  getAllPost(userid): Observable<any> {
    return this.http.get(this.baseUrl + "/managepost/getallpost?userid=" + userid, this.httpOptions)
  }


  updateStatusPlace(placeID, statusID) {
    return this.http.post(this.baseUrl + "/managepost/change-status-place" + "?placeID=" + placeID + "&statusPlaceID=" + statusID, this.httpOptions)
  }

  getPostForm(placeID): Observable<any>{
    return this.http.get(`${this.baseUrl}/api/cp/places/fillupdate?placeid=${placeID}`,this.httpOptions)
  }

  updatePlace(form): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/cp/places/update`,JSON.stringify(form),this.httpOptions)
  }

}
