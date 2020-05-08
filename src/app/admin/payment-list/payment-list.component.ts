import { UserService } from './../../user/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from './../../shared/service/shared.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from 'src/app/places/service/payment.service';
import { Payment } from 'src/app/shared/model/payment.model';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styles: []
})
export class PaymentListComponent implements OnInit {
  displayedColumns: string[] = ['userID', 'placeID', 'orderID', 'status', 'payerID', 'money', 'description', 'createTime'];
  dataSource: any;
  payments: Payment[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public userService: UserService,
    public sharedService: SharedService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.paymentService.getAllPayment().subscribe(
      data => {
      this.payments = data;
        this.dataSource = new MatTableDataSource<Payment>(this.payments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
