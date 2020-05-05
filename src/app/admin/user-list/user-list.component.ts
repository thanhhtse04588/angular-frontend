import { UserStatus } from './../../shared/common';
import { SharedService } from '../../shared/service/shared.service';
import { UserService } from './../../user/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from './../admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { UserProfile } from 'src/app/shared/model/user.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['userID', 'userName', 'statusName', 'name',
    'gender', 'DOB', 'address', 'phoneNumber', 'email', 'bankAccount', 'void'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  users: UserProfile[];
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
    this.userService.getAllUser().subscribe(
      data => {
        this.users = data;
        this.dataSource = new MatTableDataSource<UserProfile>(this.users);
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
      case UserStatus.ACTIVE: return true;
      case UserStatus.DEACTIVE: return true;
      default: return false;
    }
  }
  isActiveUser(id) {
    return id === UserStatus.ACTIVE;
  }
  isDeactiveUser(id) {
    return id === UserStatus.DEACTIVE;
  }

  changeStatus(userID: number, currentStatus: number) {
    this.userService.updateStatusUser(userID, 
      currentStatus == UserStatus.ACTIVE ? UserStatus.DEACTIVE : UserStatus.ACTIVE).subscribe(
      data => data ? this.reload() : alert('Thao tác không thành công!')
    );
  }
}