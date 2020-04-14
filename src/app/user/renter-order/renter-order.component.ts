import { AdminService } from './../../admin/admin.service';

import { PlaceStatus, OrderStatus } from './../../class/common';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-renter-order',
  templateUrl: './renter-order.component.html',
  styleUrls: ['./renter-order.component.css']
})
export class RenterOrderComponent implements OnInit, OnDestroy {
  orders: Observable<Order>;
  private subs = new Subscription();
  private userID: number;
  item: Order;
  updateStatus: UpdateStatus;
  constructor(private userService: UserService,
    private adminService: AdminService) { }
  isShowButton(id) {
    return id == PlaceStatus.ACTIVE;
  }

  reload() {
    this.userID = +sessionStorage.getItem("userID");
    this.subs.add(this.userService.getListOrderByUserID(this.userID).subscribe(
      data => {
        this.orders = data
        console.log(this.orders)
      }));
  }

  ngOnInit() {
    this.reload();
  }

  onReject() {
    console.log(" onreject ")
    this.subs.add(this.adminService.changeStatusChecking(
      this.updateStatus = {
        orderID: this.item.orderID,
        placeID: this.item.placeID,
        statusOrderID: OrderStatus.REJECT, // Reject
        statusPlaceID: PlaceStatus.ACTIVE // Active-> Active
      }).subscribe(
        data => data ? alert("Thao tác thành công!") : alert("Thao tác không thành công!"),
        (err) => console.log(err),
        () => this.reload()
      ))
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
interface Order {
  orderID: number;
  placeID: number;
  orderStatusID: number;
  dateTime: Date;
  name: string;
  email: string;
  phone_number: string;
  message: string;

  title: string;
  placeStatus: string;
  orderStatus: string;
}
interface UpdateStatus {
  orderID: number,
  statusOrderID: number,
  placeID: number,
  statusPlaceID: number,
}