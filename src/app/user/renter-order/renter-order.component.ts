import { SharedService } from './../../shared/shared.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AdminService } from './../../admin/admin.service';
import { PlaceStatus, OrderStatus } from './../../class/common';
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
  //edit
  editOrderForm: FormGroup;
  constructor(private userService: UserService,
    private adminService: AdminService,public sharedService:SharedService) { }

  ngOnInit() {
    this.reload();

    this.editOrderForm = new FormGroup({
      orderID: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      dateTime: new FormControl('', [Validators.required]),
      message: new FormControl('')
    });
  }
  isShowButton(id) {
    return id == PlaceStatus.ACTIVE;
  }
  reload() {
    this.userID = +sessionStorage.getItem("userID");
    this.subs.add(this.userService.getListOrderByUserID(this.userID).subscribe(
      data => {
        this.orders = data;
      }));
  }
  statusOrderColor(id){
    switch (id) {
      case OrderStatus.DEAL: return "orange";
      case OrderStatus.CONSIDER: return "purple";
      case OrderStatus.PENDING: return "cyan";
      case OrderStatus.REJECT: return "grey";
      case OrderStatus.APPROVE: return "green";
      default: return "grey";
    }
  }

  isInProcess(status: number){
    return [OrderStatus.PENDING,OrderStatus.CONSIDER].includes(status);
  }
  isDeal(status: number) {
    return status == OrderStatus.DEAL;
  }

  // statusPlaceColor(id) {
  //   switch (id) {
  //     case PlaceStatus.ACTIVE: return "green";
  //     case PlaceStatus.PENDING: return "orange";
  //     case PlaceStatus.CHECKING: return "cyan";
  //     case PlaceStatus.CANCEL: return "grey";
  //     default: return "grey";
  //   }
  // }
  
  onDeal(){

  }

  onReject() {
    this.subs.add(this.adminService.changeStatusOrder(
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

  //edit order
  creatEditOrder(order: Order) {
    this.editOrderForm = new FormGroup({
      orderID: new FormControl(order.orderID),
      name: new FormControl(order.name, Validators.required),
      email: new FormControl(order.email, [Validators.email, Validators.required]),
      phoneNumber: new FormControl(order.phoneNumber, [Validators.required]),
      dateTime: new FormControl(order.dateTime, [Validators.required]),
      message: new FormControl(order.message)
    });
  }

  onEdit(order: Order) {
    this.creatEditOrder(order);
  }

  onSave(event) {
    this.subs.add(this.userService.editOrder(event.value).subscribe(
      data => data ? alert("Chỉnh sửa thành công") : alert("Chỉnh sửa thất bại") ));
    this.reload();
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
  phoneNumber: string;
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