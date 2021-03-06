import { thanToday } from 'src/app/shared/directive/than-today.directive';
import { InsertedOrderForm } from './../../../shared/model/order.model';
import { SharedService } from '../../../shared/service/shared.service';
import { Common } from '../../../shared/common';
import { AuthenticationService } from './../../../index/service/authentication.service';
import { UserService } from './../../../user/service/user.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ElementRef, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PayPaypal, Payment } from 'src/app/shared/model/payment.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  isSubmit = false;
  requestOrderForm: FormGroup;
  // payment
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  payFor = false;
  pay: PayPaypal = {
    price: Common.PRICEORDER.valueOf(),
    description: 'Phí dịch vụ môi giới',
    payFor: false,
    placeID: this.placeID
  };
  payment: Payment;
  minDate: string;
  maxDate: string;
  constructor(
    public dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public placeID: number,
    private userService: UserService, public loginService: AuthenticationService,
     public sharedService: SharedService) { }

  ngOnInit() {
    this.ngOnInitOrderForm();
  }
  payResult(event: PayPaypal) {
    this.payFor = event.payFor;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  // Liên hệ ngay
  ngOnInitOrderForm() {
    this.requestOrderForm = new FormGroup({
      name: new FormControl('', [Validators.maxLength(100), Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('((\\+91-?)|0)?[0-9]*')]),
      datetime: new FormControl('', [Validators.required, thanToday()]),
      mess: new FormControl('', [Validators.maxLength(100)])
    });
  }

  onSubmitOrder() {
    this.isSubmit = true;
    let orderForm: InsertedOrderForm;
    orderForm = {
      ordererID: this.loginService.currentUserValue.userID,
      placeID: this.placeID,
      name: this.name.value,
      phoneNumber: this.phoneNumber.value,
      email: this.email.value,
      // dateTime: formatDate(this.datetime.value, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
      dateTime: this.datetime.value,
      message: this.mess.value,
    };
    this.userService.insertOrder(orderForm).subscribe(
      data => {
        if (data) {
          this.sharedService.loggerDialog(true,'Liên hệ thành công , chúng tôi sẽ phản hồi sớm.');
        } else {
          this.sharedService.loggerDialog(false,'Mặt hàng không còn tồn tại');
        }
      }, (error) => this.sharedService.loggerDialog(false),
      () => {
        this.dialogRef.close()
      }
    );
  }

  get name() { return this.requestOrderForm.get('name'); }
  get email() { return this.requestOrderForm.get('email'); }
  get phoneNumber() { return this.requestOrderForm.get('phoneNumber'); }
  get datetime() { return this.requestOrderForm.get('datetime'); }
  get mess() { return this.requestOrderForm.get('mess'); }
}
