import { _OBSERVER } from './../common';
import { SharedService } from './../service/shared.service';

import { AuthenticationService } from './../../index/service/authentication.service';
import { PaymentService } from './../../places/service/payment.service';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { PayPaypal, Payment } from '../model/payment.model';
declare var paypal;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
})
export class PaypalButtonComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  @Input() pay: PayPaypal;
  @Output() payResult = new EventEmitter<PayPaypal>();
  constructor(private paymentService: PaymentService, public loginService: AuthenticationService, private sharedService: SharedService) { }

  ngOnInit() {
    this.paypalOnInit();
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
                description: this.pay.description,
                amount: {
                  currency_code: 'USD',
                  value: this.pay.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.sharedService.loggerDialog(true,'Thanh toán paypal thành công');
          this.pay.payFor = true;
          this.payResult.emit(this.pay);

          let payment: Payment;
          payment = {
            placeID: this.pay.placeID,
            userID: this.loginService.currentUserValue.userID,
            orderID: data.orderID,
            payerID: data.payerID,
            status: order.status,
            createTime: order.create_time,
            description: this.pay.description,
            money: this.pay.price,
          };
          this.paymentService.completePayment(payment).subscribe(_OBSERVER);
        },
        onError: err => {
      this.sharedService.loggerDialog(false,'Có lỗi!,Thanh tóan Paypal thất bại!')
          this.pay.payFor = false;
          this.payResult.emit(this.pay);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
}
