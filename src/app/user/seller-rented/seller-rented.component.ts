import { AuthenticationService } from './../../index/service/authentication.service';
import { SharedService } from './../../shared/shared.service';
import { PlaceStatus } from '../../shared/common';

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ManagePostForm } from 'src/app/shared/model/place.model';

@Component({
  selector: 'app-seller-rented',
  templateUrl: './seller-rented.component.html',
})
export class SellerRentedComponent implements OnInit {
  userID: number;
  posts: Observable<ManagePostForm>;
  constructor(
    private userService: UserService,
    public sharedService: SharedService, public loginService: AuthenticationService ) { }

  ngOnInit() {
    this.userID = this.loginService.currentUserValue.userID;

    this.userService.getAllPost(this.userID).subscribe(
      data => this.posts = data
    );
  }

  isRented(id) {
    return id === PlaceStatus.RENTED;
  }
}
