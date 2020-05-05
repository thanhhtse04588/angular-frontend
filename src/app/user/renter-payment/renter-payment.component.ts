import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from './../../shared/service/shared.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from 'src/app/places/service/payment.service';
import { Payment } from 'src/app/shared/model/payment.model';
import { AuthenticationService } from 'src/app/index/service/authentication.service';

@Component({
  selector: 'app-renter-payment',
  templateUrl: './renter-payment.component.html',
  styles: []
})
export class RenterPaymentComponent implements OnInit {
  displayedColumns: string[] = ['userID', 'placeID', 'orderID', 'status', 'payerID', 'money', 'description', 'createTime'];
  dataSource: any;
  payments: Payment[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public sharedService: SharedService,
    private paymentService: PaymentService,
    private loginService: AuthenticationService
  ) { }

  ngOnInit(): void {
    const userID = this.loginService.currentUserValue.userID;
    this.paymentService.getPaymentByUserID(userID).subscribe(
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
