import { _OBSERVER } from './../../shared/common';
import { AuthenticationService } from 'src/app/index/service/authentication.service';
import { UserProfileComponent } from './../user-profile/user-profile.component';
import { UserProfile } from './../../shared/model/user.model';

import { Common, _httpOptions } from '../../shared/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contract } from 'src/app/shared/model/contract.model';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, public dialog: MatDialog,private loginService: AuthenticationService) { }

  openUserProfileDialog(id: number): void {
    this.getUserProfileByUserID(id).subscribe(
      data => {
        console.log(data);
        
        this.dialog.open(UserProfileDialogComponent, {
          width: '350px',
          data: data as UserProfile
        });
      }
    );
  }

  openUserProfile(id: number): void {
    this.getUserProfileByUserID(id).subscribe(
      data => {
        const dialogRef = this.dialog.open(UserProfileComponent, {
          width: '440px',
          data: data as UserProfile
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result){
          result.userID= this.loginService.currentUserValue.userID;
          result.avatarLink = sessionStorage.getItem("avatarLink") || result.avatarLink;
          console.log(JSON.stringify(result));
          this.updateUser(result).subscribe(_OBSERVER);}
        });
      }
    );  
  }

  getAllUser(): Observable<any> {
    return this.http.get(`${Common.urlBase}/manageuser/get-all-user`);
  }

  getUserProfileByUserID(id: number): Observable<any> {
    return this.http.get(`${Common.urlBase}/manageuser/get-user-by-id?userID=${id}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.post(`${Common.urlBase}/manageuser/update-user`, JSON.stringify(user), _httpOptions);
  }

  updateStatusUser(userID: number, statusID: number): Observable<any> {
    return this.http.post(`${Common.urlBase}/manageuser/change-status?userID=${userID}&statusID=${statusID}`, _httpOptions);
  }

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
