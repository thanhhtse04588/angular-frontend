import { Pay } from './../../../shared/paypal-button/paypal-button.component';
import { SharedService } from './../../../shared/shared.service';

import { Common } from './../../../class/common';
import { PaymentService } from './../../service/payment.service';
import { AuthenticationService } from './../../../index/service/authentication.service';
import { InsertedOrderForm } from '../../../class/inserted-order-form';
import { UserService } from './../../../user/service/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { formatDate, Location } from "@angular/common";
import { Payment } from 'src/app/class/Payment';
import { ElementRef, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { thanToday } from 'src/app/shared/directive/than-today.directive';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit, OnDestroy {
  isSubmit = false;
  private subs = new Subscription();
  orderForm: InsertedOrderForm
  requestOrderForm: FormGroup
  //payment
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  pay: Pay;
  payFor = false;
  payment: Payment;
  minDate;
  maxDate;
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    public loginService: AuthenticationService,
    private _location: Location,
    public sharedService: SharedService) {
  }

  ngOnInit() {
    let today: Date = new Date()
    this.minDate = today.toISOString().slice(0, 16);
    today.setDate(today.getDay() + 10);
    this.maxDate = today.toISOString().slice(0, 16);

    this.pay = {
      price: Common.PRICEORDER,
      description: 'Đặt cọc tiền giữ nhà',
      payFor: false,
      placeID: +sessionStorage.getItem("placeID")
    };
    this.ngOnInitOrderForm();
  }
  onPayResult(event: Pay) {
    event.payFor ? alert("Thanh tóan thành công") : alert("Có lỗi!,Thanh tóan thất bại!");
    this.payFor = event.payFor;
  }

  // Liên hệ ngay
  ngOnInitOrderForm() {
    this.requestOrderForm = new FormGroup({
      name: new FormControl('', [Validators.maxLength(100), Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("((\\+91-?)|0)?[0-9]*")]),
      datetime: new FormControl('', [Validators.required, this.dateFormat]),
      mess: new FormControl('', [Validators.maxLength(100)])
    });
  }
  dateFormat(c: AbstractControl): { [key: string]: boolean } {
    let value = new Date(c.value);
    return isNaN(value.getTime()) || value <= new Date() ? { 'invalid': true } : undefined;
  }
  onSubmitOrder() {
    this.isSubmit = true;
    this.orderForm = new InsertedOrderForm()

    this.orderForm.ordererID = this.loginService.currentUserValue.userID;
    this.orderForm.placeID = +sessionStorage.getItem("placeID");
    this.orderForm.name = this.name.value;
    this.orderForm.phoneNumber = this.phoneNumber.value;
    this.orderForm.email = this.email.value;
    this.orderForm.dateTime = formatDate(this.datetime.value, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    this.orderForm.message = this.mess.value;
    this.subs.add(this.userService.insertOrder(this.orderForm).subscribe(
      data => {
        if (data) {
          alert("Liên hệ thành công , chúng tôi sẽ phản hổi sớm.")
        } else {
          alert("Ôi, mặt hàng không còn tồn tại")
        }
      }, (error) => console.log(error),
      () => this._location.back()
    ))
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  get name() {return this.requestOrderForm.get('name');}
  get email() { return this.requestOrderForm.get('email');}
  get phoneNumber() {return this.requestOrderForm.get('phoneNumber');}
  get datetime() { return this.requestOrderForm.get('datetime'); }
  get mess() { return this.requestOrderForm.get('mess'); }


}