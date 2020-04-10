import { PlaceCommon } from './../../class/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ManagePostForm } from 'src/app/class/place-quick-view';

@Component({
  selector: 'app-seller-manage',
  templateUrl: './seller-manage.component.html',
  styleUrls: ['./seller-manage.component.css']
})
export class SellerManageComponent implements OnInit {
  placeID: number;
  userID: number
  posts: Observable<ManagePostForm>;
  pl = new PlaceCommon()
  statusSelects = [
    { id: -1, name: "Tất cả" }, // Cancel, Active, Pending, Checking
    { id: this.pl.ACTIVE, name: "Đã duyệt" },
    { id: this.pl.PENDING, name: "Đang chờ duyệt" },
    { id: this.pl.CHECKING, name: "Đang kiểm tra" },
    { id: this.pl.CANCEL, name: "Đã hủy" }
  ];
  statusSelected = this.statusSelects[0].id;

  constructor(private userService: UserService,
    private router: Router) { }
  ngOnInit() {
     this.userID = +sessionStorage.getItem("userID")
    this.userService.getAllPost(this.userID).subscribe(
      data => this.posts = data
    )
  }

  isStatusShow(id) {
    if (this.statusSelected == -1) { // Cancel, Active, Pending, Checking
      return id == this.pl.ACTIVE || id == this.pl.PENDING || id == this.pl.CHECKING || id == this.pl.CANCEL;
    } else {
      return id == this.statusSelected;
    }
  }
  isViewShow(id){
    return id == this.pl.ACTIVE
  }
  isCancelShow(id) {
    return id !== this.pl.CANCEL;
  }

  isEditShow(id) {
    return id == this.pl.PENDING
  }

  statusColor(id){
    switch (id) {
      case this.pl.ACTIVE: return "green";
        
        break;
        case this.pl.PENDING: return "orange";
        
        break;
        case this.pl.CHECKING: return "cyan";
        
        break;
        case this.pl.CANCEL: return "grey";
        
        break;
    }
  }
  placeDetail(id: number) {
    this.router.navigate(['places/detail', id],{skipLocationChange: true});
  }

  edit() {  
    console.log(this.placeID)
    this.router.navigate(["user/seller/post-edit",{id:this.placeID}], {skipLocationChange: true})
  }
  cancel() {
    this.userService.updateStatusPlace(this.placeID, this.pl.CANCEL).subscribe(
      data=> {
        if(data){
          this.userService.getAllPost(this.userID).subscribe(
            data => this.posts = data
          )
        } 
      }
    )
  }

}
