import { SharedService } from './../../shared/shared.service';
import { Router } from '@angular/router';
import { PlaceStatus, BookingStatus } from './../../class/common';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from './../admin.service';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-checking-list',
  templateUrl: './checking-list.component.html',
  styleUrls: ['./checking-list.component.css']
})
export class CheckingListComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  displayedColumns: string[] = ['checkingID', 'title', 'dateTime', 'phoneNumber', 'contactName', 'statusPlace',
    // 'status',
    'void'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  checkingList: any
  item: Checking
  updateStatus: UpdateStatus
  constructor(private adminService: AdminService, public sharedService:SharedService) {
  }

  ngOnInit() {
    this.reload()
  }

  reload() {
    this.subs.add(this.adminService.getAllChecking().subscribe(
      data => {
        this.checkingList = data
        this.dataSource = new MatTableDataSource<Checking>(this.checkingList);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  colorStatusPlace(id) {
    switch (id) {
      case PlaceStatus.PENDING: return 'text-warning'
      case PlaceStatus.CHECKING: return 'text-primary'
      case PlaceStatus.ACTIVE: return 'text-success'
      default: return 'text-muted'
    }
  }

  isShowButton(id) {
    switch (id) {
      case PlaceStatus.PENDING: return true
      case PlaceStatus.CHECKING: return true
      case PlaceStatus.ACTIVE: return false
      default: return false
    }
  }


  onApprove() {
    if (this.item.statusPlaceID == PlaceStatus.PENDING) {
      this.subs.add(this.adminService.changeStatusChecking(
        this.updateStatus = {
          checkingID: this.item.checkingID,
          placeID: this.item.placeID,
          statusCheckingID: BookingStatus.APPROVE, // Approve
          statusPlaceID: PlaceStatus.CHECKING // Pending -> Checking
        }).subscribe(
          data => data ? this.reload() : alert("Thao tác không thành công!")

        ))
    } else if (this.item.statusPlaceID == PlaceStatus.CHECKING) {
      this.subs.add(this.adminService.changeStatusChecking(
        this.updateStatus = {
          checkingID: this.item.checkingID,
          placeID: this.item.placeID,
          statusCheckingID: BookingStatus.APPROVE, // Approve
          statusPlaceID: PlaceStatus.ACTIVE // Checking -> Active
        }).subscribe(
          data => data ? this.reload() : alert("Thao tác không thành công!")
        ))
    }
  }

  onReject() {
    this.subs.add(this.adminService.changeStatusChecking(
      this.updateStatus = {
        checkingID: this.item.checkingID,
        placeID: this.item.placeID,
        statusCheckingID: BookingStatus.REJECT, // Reject
        statusPlaceID: PlaceStatus.CANCEL // Pending,Checking -> Cancel
      }).subscribe(
        data => data ? this.reload() : alert("Thao tác không thành công!")
      ))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}

interface Checking {
  checkingID: number;
  placeID: number;
  statusPlaceID: number;
  userName: string;
  title: string;
  dateTime: string;
  phoneNumber: string;
  contactName: string;
  status: string;
  statusPlace: string;
  checkingStatusID: number
}

interface UpdateStatus {
  checkingID: number;
  placeID: number;
  statusCheckingID: number;
  statusPlaceID: number;
} 
