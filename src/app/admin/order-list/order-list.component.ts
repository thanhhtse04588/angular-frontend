import { SharedService } from './../../shared/shared.service';
import { Router } from '@angular/router';
import { PlaceStatus, OrderStatus, ContractStatus, Common } from './../../class/common';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from './../admin.service';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  displayedColumns: string[] = ['orderID', 'contactName', 'email', 'phoneNumber', 'dateTime', 'address', 'message', 'statusPlace', 'status', 'void'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  orderList: any;
  item: Order;
  updateStatus: UpdateStatus;
  // send Deal
  contract: Contract;
  from;
  to;
  constructor(private adminService: AdminService,
    public sharedService:SharedService) { }

  ngOnInit() {
    this.reload()
  }

  private reload() {
    this.subs.add(this.adminService.getAllOrder().subscribe(
      data => {
        this.orderList = data
        this.dataSource = new MatTableDataSource<Order>(this.orderList);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    ))
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
    this.subs.add(this.adminService.changeStatusOrder(
      this.updateStatus = {
        orderID: this.item.orderID,
        placeID: this.item.placeID,
        statusOrderID: (this.item.orderStatusID == OrderStatus.PENDING) ? OrderStatus.CONSIDER : OrderStatus.DEAL, // Approve
        statusPlaceID: PlaceStatus.ACTIVE // Active -> ACtive
      }).subscribe(
        data => data ? this.reload() : alert("Thao tác không thành công!")
      ))
  }

  sendDeal(form) {
    this.subs.add(this.adminService.createContract(this.contract = {
      ownerID: this.item.ownerID,
      renterID: this.item.ordererID,
      placeID: this.item.placeID,
      orderID: this.item.orderID,
      startDate: form.from,
      endDate: form.to,
      fee: this.item.price * Common.FEE,
      contractStatusID: ContractStatus.PENDING,
    }).subscribe(
      is => is? this.onApprove() : alert('Thao tác không thành công')
    ))
    this.reload();
  }

  onReject() {
    this.subs.add(this.adminService.changeStatusChecking(
      this.updateStatus = {
        orderID: this.item.orderID,
        placeID: this.item.placeID,
        statusOrderID: OrderStatus.REJECT, // Reject
        statusPlaceID: PlaceStatus.ACTIVE // Active-> Active
      }).subscribe(
        data => data ? this.reload() : alert("Thao tác không thành công!")
      ))
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

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
  contractStatusID: number;
}