import { PaymentService } from './../service/payment.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ModalDirective} from 'angular-bootstrap-md';
import { AuthenticationService } from './../../index/service/authentication.service';
import { InsertedOrderForm } from '../../class/inserted-order-form';
import { UserService } from './../../user/service/user.service';
import { Observable } from 'rxjs';
import { PlaceDetail, EquipmentListForm } from './../../class/place-detail';
import { PlaceService } from './../service/place.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { formatDate } from "@angular/common";
import { Payment } from 'src/app/class/Payment';

import { ElementRef, Component, OnInit, ViewChild } from '@angular/core';

declare var paypal;


@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit{
  @ViewChild('frameOrder', { static: true }) frameOrder: ModalDirective;
  @ViewChild('frameDeposit', { static: true }) frameDeposit: ModalDirective;
  @ViewChild('frameDepositSuccess', { static: true }) frameDepositSuccess: ModalDirective;
  id: number
  place: PlaceDetail
  orderForm: InsertedOrderForm
  requestOrderForm: FormGroup
  hours = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
  
  displayedColumns: string[] = ['name', 'quantity', 'price', 'likeNew', 'equipmentDescrible'];
  dataSource: any
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  //payment
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  product = {
    price: 100,
    description: 'Đặt cọc tiền giữ nhà',
    img: ''
  };
  paidFor = false;
  payment: Payment

  constructor(private route: ActivatedRoute,
    private router: Router,
    private placeService: PlaceService,
    private userService: UserService,
    public loginService: AuthenticationService,
    private paymentService: PaymentService) {
  }

  ngOnInit() {
    this.paypalOnInit()
    this.ngOnInitOrderForm()

    this.place = new PlaceDetail()

    this.id = this.route.snapshot.params['id']

    this.placeService.getPlaceDetail(this.id)
      .subscribe(data => {
        console.log(data)
        this.place = data
        this.dataSource = new MatTableDataSource<EquipmentListForm>(this.place.listEquip);
        this.dataSource.paginator = this.paginator;
      }, error => console.log(error));
  }

  paypalOnInit() {
    return paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
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
          console.log(data);
          console.log(order);
          this.frameDeposit.hide()
          this.frameDepositSuccess.show()

          this.payment = new Payment()
          this.payment.placeID = this.place.placeID
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

  onOpenFrameDeposit(event) {
  }

  onCloseFrameDeposit() {
  }
  // Liên hệ ngay
  ngOnInitOrderForm() {
    this.requestOrderForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(100)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(12)]),
      date: new FormControl('', [Validators.required, this.dateFormat]),
      time: new FormControl(-1, [Validators.required]),
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
    this.orderForm.placeID = this.place.placeID
    this.orderForm.name = this.name.value
    this.orderForm.phoneNumber = this.phoneNumber.value
    this.orderForm.email = this.email.value
    this.orderForm.dateTime = formatDate(this.date.value + " " + this.time.value, 'yyyy-MM-dd HH:mm:ss', 'en-US')
    this.orderForm.message = this.mess.value
    console.log(this.orderForm)

    this.userService.insertOrder(this.orderForm).subscribe(
      data => {
        if (data) {
          alert("Liên hệ thành công , chúng tôi sẽ phản hổi sớm.")
        } else {
          alert("Ôi, mặt hàng không còn tồn tại")
          this.router.navigate(["home"])
        }
        this.frameOrder.hide()
      }, error => {
        this.router.navigate(["error"])
        console.log(error)
      }
    );
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

  get date() {
    return this.requestOrderForm.get('date');
  }

  get time() {
    return this.requestOrderForm.get('time');
  }

  get mess() {
    return this.requestOrderForm.get('mess');
  }

  // Load js file 
  loadScripts() {
    const dynamicScripts = [];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script')
      node.src = dynamicScripts[i]
      node.type = 'text/javascript'
      node.async = false;
      node.charset = 'utf-8'
      document.getElementsByTagName('head')[0].appendChild(node)
    }
  }

}