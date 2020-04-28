import { AuthenticationService } from './../../index/service/authentication.service';
import { SharedService } from './../../shared/shared.service';
import { PlaceStatus } from './../../class/common';

import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../service/user.service';
import { ManagePostForm } from 'src/app/class/place-quick-view';

@Component({
  selector: 'app-seller-rented',
  templateUrl: './seller-rented.component.html',
})
export class SellerRentedComponent implements OnInit,OnDestroy {
  private subs = new Subscription()
  userID: number;
  posts: Observable<ManagePostForm>;
  constructor(private userService: UserService,
    public sharedService:SharedService, public loginService: AuthenticationService ) { }

  ngOnInit() {
    this.userID = this.loginService.currentUserValue.userID;

    this.subs.add(this.userService.getAllPost(this.userID).subscribe(
      data => this.posts = data
    ))
  }

  isRented(id) {
    return id == PlaceStatus.RENTED;
  }
ngOnDestroy(){
  this.subs.unsubscribe()
}
}
