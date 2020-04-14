
import { PlaceStatus } from './../../class/common';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../service/user.service';
import { ManagePostForm } from 'src/app/class/place-quick-view';

@Component({
  selector: 'app-seller-manage',
  templateUrl: './seller-manage.component.html',
  styleUrls: ['./seller-manage.component.css']
})
export class SellerManageComponent implements OnInit, OnDestroy {
  private subs = new Subscription()
  placeID: number;
  userID: number
  posts: Observable<ManagePostForm>;
  statusSelects = [
    { id: -1, name: "Tất cả" }, // Cancel, Active, Pending, Checking
    { id: PlaceStatus.ACTIVE, name: "Đã duyệt" },
    { id: PlaceStatus.PENDING, name: "Đang chờ duyệt" },
    { id: PlaceStatus.CHECKING, name: "Đang kiểm tra" },
    { id: PlaceStatus.CANCEL, name: "Đã hủy" }
  ];
  statusSelected: any;

  constructor(private userService: UserService,
    private router: Router) { 
      this.statusSelected=  this.statusSelects[0].id;
    }
    
  ngOnInit() {
    this.userID = +sessionStorage.getItem("userID");

    this.subs.add(this.userService.getAllPost(this.userID).subscribe(
      data => this.posts = data
    ));
  }

  isStatusShow(id) {
    if (this.statusSelected == -1) { // Cancel, Active, Pending, Checking
      return id == PlaceStatus.ACTIVE || id == PlaceStatus.PENDING || id == PlaceStatus.CHECKING || id == PlaceStatus.CANCEL;
    } else {
      return id == this.statusSelected;
    }
  }

  isViewShow(id) {
    return id == PlaceStatus.ACTIVE
  }
  isCancelShow(id) {
    return id !== PlaceStatus.CANCEL;
  }

  isEditShow(id) {
    return id == PlaceStatus.PENDING
  }

  statusColor(id) {
    switch (id) {
      case PlaceStatus.ACTIVE: return "green";
      case PlaceStatus.PENDING: return "orange";
      case PlaceStatus.CHECKING: return "cyan";
      case PlaceStatus.CANCEL: return "grey";
      default: return "grey";
    }
  }
  placeDetail(id: number) {
    sessionStorage.setItem("placeID",id.toString())
    this.router.navigate(['places/detail']);
  }

  edit() {
    this.router.navigate(["user/seller/post-edit", { id: this.placeID }], { skipLocationChange: true })
  }
  cancel() {
    this.subs.add(this.userService.updateStatusPlace(this.placeID, PlaceStatus.CANCEL).subscribe(
      data => {
        if (data) {
          this.userService.getAllPost(this.userID).subscribe(
            data => this.posts = data
          )
        }
      }
    ))

  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
