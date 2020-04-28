import { finalize, concatMap, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { BillStatus, Common } from './../../class/common';
import { COLBillDetail } from './../../class/cost-of-living.model';
import { ModalDirective } from 'angular-bootstrap-md';
import { CostOfLivingBillService } from './../../shared/cost-of-living-bill.service';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from './../../shared/shared.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { COLBill } from 'src/app/class/cost-of-living.model';
import { forkJoin} from 'rxjs';

@Component({
  selector: 'app-cost-of-living-bill',
  templateUrl: './cost-of-living-bill.component.html',
})
export class CostOfLivingBillComponent implements OnInit {
  @ViewChild('fillFormModal', { static: true }) fillFormModal: ModalDirective;
  bill: COLBill;
  displayedColumns: string[] = ['colId', 'renterId', 'ownerID', 'dateCollect', "deadLineStatus", 'totalExpense', 'paymentStatusName', 'void'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  bills: COLBill[];
  selectedFile: File = null;
  constructor(public sharedService: SharedService,
    private billService: CostOfLivingBillService, private storage: AngularFireStorage) { }
  ngOnInit(): void {
    this.totalLoad()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onFillForm(bill: COLBill) {
    this.bill = bill;
    this.fillFormModal.show()
  }
  onSave() {
    const updateBill = this.billService.updateBillDetail(this.bill);
    const updateStatus = this.billService.updateBillStatus(this.bill.colId, BillStatus.UNPAID);
    forkJoin(
      updateBill,
      updateStatus
    ).subscribe(([a, b]) => {
      if (a && b) {
        this.bill.paymentStatusId = BillStatus.UNPAID;
        alert("Thao thác thành công")
      } else {
        alert("Thao thác không thành công")
      }
    }, err => alert("Thao thác không thành công"));
  }

  onInputAmount(amount: number, item: COLBillDetail) {
    item.expensePerCost = amount * item.costPrice;
    this.bill.totalExpense = this.bill.colBillDetails.map(element => element.expensePerCost).reduce((a, b) => a + b, this.bill.placePrice);
  }

  totalLoad() {
    this.billService.getAllBill().subscribe(
      data => {
        this.bills = (data as COLBill[])
        this.dataSource = new MatTableDataSource<COLBill>(this.bills);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }
  isBillPaid(stt: number) {
    return stt == BillStatus.PAID;
  }
  isBillPending(stt: number) {
    return [BillStatus.PENDING, BillStatus.PAID].includes(stt);
  }
  onFileSelected(event, bill: COLBill) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `CashPaidBills/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`CashPaidBills/${n}`, file);

    task.snapshotChanges().pipe(finalize(() => {
      const downloadURL = fileRef.getDownloadURL();
      const updateBillStatus = this.billService.updateBillStatus(bill.colId, BillStatus.PAID)
        // .pipe(map(res => res ? BillStatus.PAID : this.bill.paymentStatusId));
        forkJoin(
          downloadURL,
          updateBillStatus
        ).subscribe(([a, b]) => {
          if (b) {
            bill.paymentStatusId = BillStatus.PAID;
            alert("Thao thác thành công");
            console.log(a);
          } else {
            alert("Thao thác không thành công");
          }
        }, err => alert("Thao thác không thành công"));
    })
    ).subscribe();
  }
}
