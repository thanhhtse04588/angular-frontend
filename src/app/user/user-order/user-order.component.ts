import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { InsertedOrderForm } from 'src/app/class/inserted-order-form';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  orderForm: InsertedOrderForm

  constructor(private UserService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    
  }
}
