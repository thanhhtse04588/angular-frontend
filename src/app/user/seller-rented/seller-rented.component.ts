import { PlaceStatus } from './../../class/common';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../service/user.service';
import { ManagePostForm } from 'src/app/class/place-quick-view';

@Component({
  selector: 'app-seller-rented',
  templateUrl: './seller-rented.component.html',
  styleUrls: ['./seller-rented.component.css']
})
export class SellerRentedComponent implements OnInit,OnDestroy {
  private subs = new Subscription()
  userID: number;
  posts: Observable<ManagePostForm>;
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userID = +sessionStorage.getItem("userID")

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
