import { Common } from './../../shared/common';
import { SharedService } from '../../shared/service/shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { BillStatus,_OBSERVER } from '../../shared/common';
import { ModalDirective } from 'angular-bootstrap-md';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AuthenticationService } from './../../index/service/authentication.service';
import { COLBill } from 'src/app/shared/model/cost-of-living.model';
import { CostOfLivingBillService } from '../../shared/service/cost-of-living-bill.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-seller-col-bill',
  templateUrl: './seller-col-bill.component.html',
  styles: []
})
export class SellerColBillComponent implements OnInit {

  @ViewChild('billDetailModal', { static: true }) billDetailModal: ModalDirective;
  bills: COLBill[];
  bill: COLBill;
  displayedColumns: string[] = ['colId', 'placeId', 'dateCollect',
  'deadLineStatus', 'totalExpense', 'paymentStatusName', 'button'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private billService: CostOfLivingBillService, public sharedService: SharedService, private loginService: AuthenticationService) { }

  ngOnInit(): void {
    this.totalLoad();
  }
  totalLoad() {
    const renterID = this.loginService.currentUserValue.userID;
    this.billService.getBillsByRenterID(renterID).subscribe(
      data => {
        this.bills = (data as COLBill[]);
        this.dataSource = new MatTableDataSource<COLBill>(this.bills);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isBillPaid(stt: number) {
    return stt === BillStatus.PAID;
  }
  isBillPending(stt: number) {
    return BillStatus.PENDING == stt;
  }
  onBillDetail(bill: COLBill) {
    this.bill = bill;
    this.billDetailModal.show();
  }
  vndToUsd(vnd: number) {
    return Math.ceil(vnd / Common.USDtoVND);
  }
}

