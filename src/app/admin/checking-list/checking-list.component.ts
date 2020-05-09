import { SharedService } from '../../shared/service/shared.service';
import { PlaceStatus, CheckingStatus } from '../../shared/common';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from './../admin.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Checking, UpdateCheckingStatus } from 'src/app/shared/model/checking.model';

@Component({
  selector: 'app-checking-list',
  templateUrl: './checking-list.component.html',
})
export class CheckingListComponent implements OnInit {
  displayedColumns: string[] = ['checkingID', 'checkingDetail', 'title', 'dateTime',
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
    this.updateStatus = {
      checkingID: this.item.checkingID,
      placeID: this.item.placeID,
      statusCheckingID: CheckingStatus.APPROVE, // Approve
      statusPlaceID: this.item.statusPlaceID === PlaceStatus.PENDING ? PlaceStatus.CHECKING : PlaceStatus.ACTIVE // Pending -> Checking
    };

    this.adminService.changeStatusChecking(this.updateStatus).subscribe(
      data => data ? this.sharedService.loggerDialog(true) : this.sharedService.loggerDialog(false)
      , null, () => this.reload());
  }

  onReject() {
    this.updateStatus = {
      checkingID: this.item.checkingID,
      placeID: this.item.placeID,
      statusCheckingID: CheckingStatus.REJECT, // Reject
      statusPlaceID: PlaceStatus.CANCEL // Pending,Checking -> Cancel
    };

    this.adminService.changeStatusChecking(this.updateStatus)
      .subscribe(
        data => data ? this.sharedService.loggerDialog(true) : this.sharedService.loggerDialog(false),
        null, () => this.reload());
  }
}




