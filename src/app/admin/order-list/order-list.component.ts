import { finalize } from 'rxjs/operators';
import { Order } from './../../shared/model/order.model';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { UpdateOrderStatus } from '../../shared/model/order.model';

import { FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { SharedService } from '../../shared/service/shared.service';
import { PlaceStatus, OrderStatus } from '../../shared/common';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from './../admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {
  displayedColumns: string[] = ['orderID', 'contactName', 'email', 'phoneNumber',
    'dateTime', 'address', 'message', 'statusPlace', 'status', 'void'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  orderList: any;
  item: Order;
  // send Deal
  formContract: FormGroup;
  constructor(
    public dialog: MatDialog,
    private adminService: AdminService, public sharedService: SharedService, private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.reload();
  }

  openDialog(order: Order): void {
    const dialogRef = this.dialog.open(ContractFormComponent, {
      width: '500px',
      data: order,
    });

    dialogRef.afterClosed().pipe(finalize(() => this.reload())).subscribe();
  }

  private reload() {
    this.adminService.getAllOrder().subscribe(
      data => {
        this.orderList = data;
        this.dataSource = new MatTableDataSource<Order>(this.orderList);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  isInProcess(id: number) {
    return [OrderStatus.PENDING, OrderStatus.CONSIDER].includes(id);
  }

  isConsiderStatus(id: number) {
    return id === OrderStatus.CONSIDER;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onApprove() {
    let updateStatus: UpdateOrderStatus;
    updateStatus = {
      orderID: this.item.orderID,
      placeID: this.item.placeID,
      statusOrderID:  OrderStatus.CONSIDER,// Approve
      statusPlaceID: PlaceStatus.ACTIVE // Active -> ACtive
    };
    this.adminService.changeStatusOrder(updateStatus).subscribe(
      data => {
        if (data) {
          this.sharedService.loggerDialog(true);
          this.reload();
        } else { alert('Lỗi! Thao tác không thành công!'); }
      }
    );
  }

  onReject() {
    let updateStatus: UpdateOrderStatus;
    updateStatus = {
      orderID: this.item.orderID,
      placeID: this.item.placeID,
      statusOrderID: OrderStatus.REJECT, // Reject
      statusPlaceID: PlaceStatus.ACTIVE // Active-> Active
    };
    this.adminService.changeStatusOrder(updateStatus).subscribe(
      data => {
        if (data) {
          this.sharedService.loggerDialog(true);
          this.reload();
        } else { this.sharedService.loggerDialog(false); }
      }
    );
  }


}
