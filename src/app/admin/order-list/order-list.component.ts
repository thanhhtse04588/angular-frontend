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
  getOrders: Subscription;
  displayedColumns: string[] = ['orderID','contactName','name','email','phoneNumber','dateTime','address','message','status','void'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  orderList: any
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getOrders=this.adminService.getAllOrder().subscribe(
      data => {
        console.log(data)
        this.orderList = data
        this.dataSource = new MatTableDataSource<Order>(this.orderList);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(){
this.getOrders.unsubscribe()
  }

}
export interface Order {
	orderID: number,
	contactName: string,
	name: string,
	email: string,
	phoneNumber: string,
	dateTime: string,
	address: string,
	message: string,
	status: string,
}