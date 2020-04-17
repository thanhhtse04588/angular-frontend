import { Common } from './../../class/common';
import { PaymentService } from './../../places/service/payment.service';
import { Payment } from './../../class/Payment';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
declare var paypal;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit {
  //payment
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  @Input() pay: Pay;
  @Output() onPayResult = new EventEmitter<Pay>();
  payment: Payment;
  constructor(private paymentService: PaymentService, ) { }

  ngOnInit() {
    this.paypalOnInit();
    console.log(this.pay);
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
          this.pay.payFor=true;
          this.onPayResult.emit(this.pay);
          this.payment = new Payment();
          this.payment.placeID = +sessionStorage.getItem("placeID");
          this.payment.userID = +sessionStorage.getItem("userID");
          this.payment.orderID = data.orderID;
          this.payment.payerID = data.payerID;
          this.payment.status = order.status;
          this.payment.createTime = order.create_time;
          this.payment.description = this.pay.description;
          this.payment.money = this.pay.price;
          this.paymentService.completePayment(this.payment).subscribe(
            data => console.log(data)
          ).unsubscribe();
        },
        onError: err => {
          alert("Có lỗi trong quá trình thanh toán");
          console.log(err);
          this.pay.payFor=false;
          this.onPayResult.emit(this.pay);
        }
      })
      .render(this.paypalElement.nativeElement);
  }

}
interface Pay {
  price: number,
  description: string,
  payFor: boolean,
  contractID: number,
  placeID: number,
  orderID: number,
}
// this.product = {
//   price: 1000,
//   description: 'Đặt cọc tiền hợp đồng thuê nhà',
// };