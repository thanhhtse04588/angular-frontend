import { endDateThanOneMonthStartDate } from './../../shared/directive/than-today.directive';
import { ModalDirective } from 'angular-bootstrap-md';

import { ContractStatus } from 'src/app/class/common';
import { thanToday } from 'src/app/shared/directive/than-today.directive';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { SharedService } from './../../shared/shared.service';
import { PlaceStatus, OrderStatus, IsUseService } from './../../class/common';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from './../admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {
  isSubmit = false;
  displayedColumns: string[] = ['orderID', 'contactName', 'email', 'phoneNumber', 'dateTime', 'address', 'message', 'statusPlace', 'status', 'void'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("dealForm") dealForm: ModalDirective;
  orderList: any;
  item: Order;
  link: string;
  // send Deal
  formContract: FormGroup;
  constructor(private adminService: AdminService,
    public sharedService: SharedService, private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.formContract = new FormGroup({
      contractLink: new FormControl("", [Validators.required]),
      startDate: new FormControl("", [Validators.required, thanToday()]),
      endDate: new FormControl("", [Validators.required]),
      fee: new FormControl("", [Validators.required, Validators.min(0)]),
      isUseService: new FormControl("", [Validators.required]),
    }, { validators: endDateThanOneMonthStartDate })
    this.reload();
  }
  private reload() {
    this.adminService.getAllOrder().subscribe(
      data => {
        this.orderList = data
        this.dataSource = new MatTableDataSource<Order>(this.orderList);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  colorStatusPlace(id) {
    switch (id) {
      case PlaceStatus.RENTED: return 'text-primary'
      case PlaceStatus.ACTIVE: return 'text-success'
      default: return 'text-muted'
    }
  }
  isInProcess(id: number) {
    return [OrderStatus.PENDING, OrderStatus.CONSIDER].includes(id);
  }

  isConsiderStatus(id: number) {
    return id == OrderStatus.CONSIDER;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onApprove() {
    let updateStatus: UpdateStatus = {
      orderID: this.item.orderID,
      placeID: this.item.placeID,
      statusOrderID: (this.item.orderStatusID == OrderStatus.PENDING) ? OrderStatus.CONSIDER : OrderStatus.DEAL, // Approve
      statusPlaceID: PlaceStatus.ACTIVE // Active -> ACtive
    }
    this.adminService.changeStatusOrder(updateStatus).subscribe(
      data => {
        if (data) {
          alert("Thao tác thành công!");
          this.reload();
          this.dealForm.hide();
        } else { alert("Lỗi! Thao tác không thành công!") }
      }
    )
  }

  sendDeal(form) {
    this.isSubmit = true;
    let contract: Contract;
    contract = form;
    contract.ownerID = this.item.ownerID;
    contract.renterID = this.item.ordererID;
    contract.placeID = this.item.placeID;
    contract.orderID = this.item.orderID;
    contract.contractLink = this.link;
    contract.isUseService = contract.isUseService ? IsUseService.YES : IsUseService.NO;
    contract.contractStatusID = ContractStatus.PENDING,

      this.adminService.createContract(contract).subscribe(is => is ? this.onApprove() : alert('Thao tác không thành công'));
  }

  onReject() {
    let updateStatus: UpdateStatus = {
      orderID: this.item.orderID,
      placeID: this.item.placeID,
      statusOrderID: OrderStatus.REJECT, // Reject
      statusPlaceID: PlaceStatus.ACTIVE // Active-> Active
    }
    this.adminService.changeStatusOrder(updateStatus).subscribe(
      data => {
        if (data) {
          alert("Thao tác thành công!");
          this.reload();
        } else { alert("Lỗi! Thao tác không thành công!") }
      }
    );
  }
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `contracts/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`contracts/${n}`, file);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(url => this.link = url);
    })).subscribe();
  }

  get contractLink() { return this.formContract.get("contractLink") }

  get startDate() { return this.formContract.get("startDate") }

  get endDate() { return this.formContract.get("endDate") }

  get fee() { return this.formContract.get("fee") }

  get isUseService() { return this.formContract.get("isUseService") }

}

interface Order {
  orderID: number,
  ordererID: number,
  contactName: string,
  name: string,
  email: string,
  phoneNumber: string,
  dateTime: string,
  address: string,
  message: string,
  status: string,
  placeID: number,
  statusPlace: string,
  statusPlaceID: number,
  orderStatusID: number,
  ownerID: number,
  price: number,
}
interface UpdateStatus {
  orderID: number,
  statusOrderID: number,
  placeID: number,
  statusPlaceID: number,
}

interface Contract {
  ownerID: number;
  renterID: number;
  placeID: number;
  orderID: number;
  startDate: string;
  endDate: string;
  fee: number;
  contractLink: string;
  isUseService: number;
  contractStatusID: number;
}