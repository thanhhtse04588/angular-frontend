import { SharedService } from '../../shared/service/shared.service';
import { UserService } from './../../user/service/user.service';
import { PlaceStatus } from '../../shared/common';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from './../admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Place } from 'src/app/shared/model/place.model';


@Component({
  selector: 'app-place-manage',
  templateUrl: './place-manage.component.html',
})
export class PlaceManageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'address', 'datePost', 'price', 'status', 'void'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  places: Place[];
  id: number;
  constructor(
    private adminService: AdminService,
    private userService: UserService,
    public sharedService: SharedService) {
  }

  ngOnInit() {
    this.reload();
  }
  reload() {
    this.adminService.getAllPlace().subscribe(
      data => {
        this.places = (data as Place[]).filter(
          item => [PlaceStatus.ACTIVE, PlaceStatus.DEACTIVE, PlaceStatus.RENTED].includes(item.statusID));  // only Place not Post
        this.dataSource = new MatTableDataSource<Place>(this.places);
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
      case PlaceStatus.ACTIVE: return true;
      case PlaceStatus.DEACTIVE: return true;
      default: return false;
    }
  }
  isActivePlace(id) {
    return id === PlaceStatus.ACTIVE;
  }
  isDeactivePlace(id) {
    return id === PlaceStatus.DEACTIVE;
  }

  toActive() {
    this.userService.updateStatusPlace(this.id, PlaceStatus.ACTIVE).subscribe(
      data => data ? this.reload() : this.sharedService.loggerDialog(false)
    );
  }

  toDeactive() {
    this.userService.updateStatusPlace(this.id, PlaceStatus.DEACTIVE).subscribe(
      data => data ? this.reload() : this.sharedService.loggerDialog(false)
    );
  }

}
