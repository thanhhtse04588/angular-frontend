import { PlaceStatus, OrderStatus } from './../../class/common';
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
export class OrderListComponent  implements OnInit,OnDestroy {
  private subs = new Subscription();
  displayedColumns: string[] = ['orderID','contactName','name','email','phoneNumber','dateTime','address','message','statusPlace','void'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  orderList: any;
  item: Order;
  updateStatus: UpdateStatus;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.reload()
  }

  private reload(){
    this.subs.add(this.adminService.getAllOrder().subscribe(
      data => {
        console.log(data)
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
   isPending(id){
     return id == OrderStatus.PENDING
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
          statusOrderID: OrderStatus.APPROVE, // Approve
          statusPlaceID: PlaceStatus.RENTED // Active -> Renter
        }).subscribe(
          data => data ? this.reload() : alert("Thao tác không thành công!")
        ))
  }

  onReject() {
    console.log(" onreject ")
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

  ngOnDestroy(){
    this.subs.unsubscribe()
  }

}
interface Order {
	orderID: number,
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
}
interface UpdateStatus{
  orderID: number,
	statusOrderID: number,
	placeID: number,
	statusPlaceID: number,
}