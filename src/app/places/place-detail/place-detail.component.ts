import { PaymentService } from './../service/payment.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthenticationService } from './../../index/service/authentication.service';
import { InsertedOrderForm } from '../../class/inserted-order-form';
import { UserService } from './../../user/service/user.service';
import { Observable } from 'rxjs';
import { PlaceDetail } from './../../class/place-detail';
import { PlaceService } from './../service/place.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { formatDate } from "@angular/common";

declare var paypal;


@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
  @ViewChild('frameOrder', { static: true }) frameOrder: ModalDirective;
  @ViewChild('frameDeposit', { static: true }) frameDeposit: ModalDirective;
  @ViewChild('frameDepositSuccess', { static: true }) frameDepositSuccess: ModalDirective;
  id: number
  place: PlaceDetail
  images: Observable<any>
  orderForm: InsertedOrderForm
  requestOrderForm: FormGroup
  //payment
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  product = {
    price: 100,
    description: 'Đặt cọc tiền giữ nhà',
    img: 'assets/couch.jpg'
  };
  paidFor = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private placeService: PlaceService,
    private userService: UserService,
    public loginService: AuthenticationService,
    private payment: PaymentService) {
  }

  ngOnInit() {
    this.paypalOnInit()
    this.ngOnInitOrderForm()

    this.place = new PlaceDetail()

    this.id = this.route.snapshot.params['id']

    this.placeService.getImageListByPlaceID(this.id)
      .subscribe(data => {
        this.images = data
      }, error => console.log(error));

    this.placeService.getPlaceDetail(this.id)
      .subscribe(data => {
        this.place = data
      }, error => console.log(error));
    //map
  }

  paypalOnInit() {
    paypal
      .Buttons({
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
          console.log(order);
          this.frameDeposit.hide()
          this.frameDepositSuccess.show()
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
      email: new FormControl('', [Validators.email, Validators.required,Validators.maxLength(100)]),
      phoneNumber: new FormControl('', [Validators.required,Validators.maxLength(12)]),
      dateTime: new FormControl('', [Validators.required,this.date]),
      mess: new FormControl('')
    });
  }
  date(c: AbstractControl): { [key: string]: boolean } {
    let value = new Date(c.value);
    return isNaN(value.getTime()) || value <= new Date() ? {'invalid': true} : undefined;
 }

  onSubmitOrder() {
    this.orderForm = new InsertedOrderForm()

    this.orderForm.ordererID = + sessionStorage.getItem("userID");
    this.orderForm.placeID = this.place.placeID
    this.orderForm.name = this.name.value
    this.orderForm.phoneNumber = this.phoneNumber.value
    this.orderForm.email = this.email.value
    this.orderForm.dateTime = formatDate(this.dateTime.value, 'yyyy-MM-dd', 'en-US')
    this.orderForm.message = this.mess.value

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

  get dateTime() {
    return this.requestOrderForm.get('dateTime');
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