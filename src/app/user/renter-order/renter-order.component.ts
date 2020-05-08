import { thanToday } from 'src/app/shared/directive/than-today.directive';
import { UpdateOrderStatus } from './../../shared/model/order.model';
import { AuthenticationService } from './../../index/service/authentication.service';
import { SharedService } from '../../shared/service/shared.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AdminService } from './../../admin/admin.service';
import { PlaceStatus, OrderStatus } from '../../shared/common';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Order } from 'src/app/shared/model/order.model';

@Component({
  selector: 'app-renter-order',
  templateUrl: './renter-order.component.html',
  styles: ['mat-form-field{width: 100%}']
})
export class RenterOrderComponent implements OnInit {
  isSubmit = false;
  orders: Observable<Order>;
  private userID: number;
  item: Order;
  updateStatus: UpdateOrderStatus;
  // edit
  editOrderForm: FormGroup;
  constructor(
    private userService: UserService, private adminService: AdminService,
    public sharedService: SharedService, public loginService: AuthenticationService) { }

  ngOnInit() {
    this.reload();
    this.editOrderForm = new FormGroup({
      orderID: new FormControl(),
      name: new FormControl('', [Validators.maxLength(100), Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('((\\+91-?)|0)?[0-9]*')]),
      dateTime: new FormControl('', [Validators.required, thanToday()]),
      message: new FormControl('', [Validators.maxLength(100)])
    });
  }

  onEdit(order: Order) {
    this.isSubmit = false;
    this.editOrderForm.patchValue(order);
  }

  isShowButton(id) {
    return id === PlaceStatus.ACTIVE;
  }
  reload() {
    this.userID = this.loginService.currentUserValue.userID;
    this.userService.getListOrderByUserID(this.userID).subscribe(
      data => this.orders = data);
  }

  isInProcess(status: number) {
    return [OrderStatus.PENDING, OrderStatus.CONSIDER].includes(status);
  }
  isDeal(status: number) {
    return status === OrderStatus.DEAL;
  }
  onReject() {
    this.adminService.changeStatusOrder(
      this.updateStatus = {
        orderID: this.item.orderID,
        placeID: this.item.placeID,
        statusOrderID: OrderStatus.REJECT, // Reject
        statusPlaceID: PlaceStatus.ACTIVE // Active-> Active
      }).subscribe(
        data => data ? this.sharedService.loggerDialog(true) : this.sharedService.loggerDialog(false),
        null,
        () => this.reload()
      );
  }

  onSave(event) {
    this.isSubmit = true;
    this.userService.editOrder(event.value).subscribe(
      data => data ? this.sharedService.loggerDialog(true) : this.sharedService.loggerDialog(false));
    this.reload();
  }

  get name() {
    return this.editOrderForm.get('name');
  }

  get email() {
    return this.editOrderForm.get('email');
  }

  get phoneNumber() {
    return this.editOrderForm.get('phoneNumber');
  }

  get dateTime() {
    return this.editOrderForm.get('dateTime');
  }

  get message() {
    return this.editOrderForm.get('message');
  }
}
