import { SharedService } from './../../shared/shared.service';
import { Router } from '@angular/router';
import { UserService } from './../../user/service/user.service';
import { PlaceStatus, BookingStatus } from './../../class/common';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from './../admin.service';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-place-manage',
  templateUrl: './place-manage.component.html',
  styleUrls: ['./place-manage.component.css']
})
export class PlaceManageComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  displayedColumns: string[] = ['id', 'title', 'address', 'datePost', 'price', 'status', 'void'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  places: Place[]
  id: number;
  constructor(private adminService: AdminService,
     private userService: UserService,
     public sharedService:SharedService) {
  }

  ngOnInit() {
    this.reload()
  }
  
  reload() {
    this.subs.add(this.adminService.getAllPlace().subscribe(
      data => {
        this.places =(data as Place[]).filter(
          item => [PlaceStatus.ACTIVE,PlaceStatus.DEACTIVE,PlaceStatus.RENTED].includes(item.statusID)) // only Place not Post 
          
        this.dataSource = new MatTableDataSource<Place>(this.places);
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
      // case PlaceStatus.PENDING: return 'text-warning'
      // case PlaceStatus.CHECKING: return 'text-primary'
      // case PlaceStatus.ACTIVE: return 'text-success'
      default: return 'text-muted'
    }
  }

  isShowButton(id) {
    switch (id) {
      case PlaceStatus.ACTIVE: return true
      case PlaceStatus.DEACTIVE: return true
      default: return false
    }
  }
  
  isActivePlace(id) {
    return id == PlaceStatus.ACTIVE;
  }
  isDeactivePlace(id) {
    return id == PlaceStatus.DEACTIVE;
  }

  toActive() {
    this.subs.add(this.userService.updateStatusPlace(this.id, PlaceStatus.ACTIVE).subscribe(
      data => data ? this.reload() : alert("Thao tác không thành công!")
    ))
  }

  toDeactive() {
    this.subs.add(this.userService.updateStatusPlace(this.id, PlaceStatus.DEACTIVE).subscribe(
      data => data ? this.reload() : alert("Thao tác không thành công!")
    ))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}

interface Place {
  id: number
  imageLarge: string;
  title: string;
  address: string;
  datePost: string;
  price: number;
  status: string;
  statusID: number;
}
