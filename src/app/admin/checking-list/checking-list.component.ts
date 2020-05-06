import { SharedService } from '../../shared/service/shared.service';
import { PlaceStatus, CheckingStatus } from '../../shared/common';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from './../admin.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Checking, UpdateCheckingStatus } from 'src/app/shared/model/checking.model';

@Component({
  selector: 'app-checking-list',
  templateUrl: './checking-list.component.html',
})
export class CheckingListComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  displayedColumns: string[] = ['checkingID','checkingDetail', 'title', 'dateTime',
    'phoneNumber', 'contactName', 'statusPlace', 'void'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  checkingList: any;
  item: Checking;
  updateStatus: UpdateCheckingStatus;
  constructor(private adminService: AdminService, public sharedService: SharedService) {
  }
  ngOnInit() {
    this.reload();
  }
  reload() {
    this.adminService.getAllChecking().subscribe(
      data => {
        this.checkingList = data;
        this.dataSource = new MatTableDataSource<Checking>(this.checkingList);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isShowButton(id) {
    switch (id) {
      case PlaceStatus.PENDING: return true;
      case PlaceStatus.CHECKING: return true;
      case PlaceStatus.ACTIVE: return false;
      default: return false;
    }
  }
  onApprove() {
    if (this.item.statusPlaceID === PlaceStatus.PENDING) {
      this.adminService.changeStatusChecking(
        this.updateStatus = {
          checkingID: this.item.checkingID,
          placeID: this.item.placeID,
          statusCheckingID: CheckingStatus.APPROVE, // Approve
          statusPlaceID: PlaceStatus.CHECKING // Pending -> Checking
        }).subscribe(
          data => data ? this.reload() : this.sharedService.loggerDialog(false)

        );
    } else if (this.item.statusPlaceID === PlaceStatus.CHECKING) {
      this.adminService.changeStatusChecking(
        this.updateStatus = {
          checkingID: this.item.checkingID,
          placeID: this.item.placeID,
          statusCheckingID: CheckingStatus.APPROVE, // Approve
          statusPlaceID: PlaceStatus.ACTIVE // Checking -> Active
        }).subscribe(
          data => data ? this.reload() : this.sharedService.loggerDialog(false)
        );
    }
  }

  onReject() {
    this.subs.add(this.adminService.changeStatusChecking(
      this.updateStatus = {
        checkingID: this.item.checkingID,
        placeID: this.item.placeID,
        statusCheckingID: CheckingStatus.REJECT, // Reject
        statusPlaceID: PlaceStatus.CANCEL // Pending,Checking -> Cancel
      }).subscribe(
        data => data ? this.reload() : this.sharedService.loggerDialog(false)
      ));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}




