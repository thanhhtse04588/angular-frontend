
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
import { ElementRef, Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
declare var paypal;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  orderForm: InsertedOrderForm
  requestOrderForm: FormGroup
  //payment
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  product;
  paidFor = false;
  payment: Payment;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    public loginService: AuthenticationService,
    private paymentService: PaymentService,
    private _location: Location) {
  }

  ngOnInit() {
    this.product = {
      price: Common.PRICEORDER,
      description: 'Đặt cọc tiền giữ nhà',
      img: ''
    };

    this.paypalOnInit();
    this.ngOnInitOrderForm();
  }

  paypalOnInit() {
    return paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'gold',
          shape: 'rect',
          label: 'pay'
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          alert("Thanh toán phí dịch vụ thành công! Mời bạn tiếp tục")
          this.payment = new Payment()
          this.payment.placeID = +sessionStorage.getItem("placeID");
          this.payment.userID = +sessionStorage.getItem("userID")
          this.payment.orderID = data.orderID
          this.payment.payerID = data.payerID
          this.payment.status = order.status
          this.payment.createTime = order.create_time
          this.payment.description = this.product.description
          this.payment.money = this.product.price
          this.paymentService.completePayment(this.payment)
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }

  // Liên hệ ngay
  ngOnInitOrderForm() {
    this.requestOrderForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      datetime: new FormControl('', [Validators.required]),
      mess: new FormControl('')
    });
  }

  dateFormat(c: AbstractControl): { [key: string]: boolean } {
    let value = new Date(c.value);
    return isNaN(value.getTime()) || value <= new Date() ? { 'invalid': true } : undefined;
  }

  onSubmitOrder() {
    this.orderForm = new InsertedOrderForm()

    this.orderForm.ordererID = + sessionStorage.getItem("userID");
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
  get name() {
    return this.requestOrderForm.get('name');
  }

  get email() {
    return this.requestOrderForm.get('email');
  }

  get phoneNumber() {
    return this.requestOrderForm.get('phoneNumber');
  }

  get datetime() {
    return this.requestOrderForm.get('datetime');
  }

  get mess() {
    return this.requestOrderForm.get('mess');
  }


}