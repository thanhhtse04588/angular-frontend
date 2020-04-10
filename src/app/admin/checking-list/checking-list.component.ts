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
export class CheckingListComponent implements OnInit,OnDestroy {
  getChecking: Subscription;
  displayedColumns: string[] = ['checkingID','placeID','userName','title','dateTime','phoneNumber','contactName','status','void'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  checkingList: any
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getChecking=this.adminService.getAllChecking().subscribe(
      data => {
        console.log(data)
        this.checkingList = data
        this.dataSource = new MatTableDataSource<Checking>(this.checkingList);

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
this.getChecking.unsubscribe()
  }

}
export interface Checking {
  checkingID: number;
  placeID: number;
  userName: string;
  title: string;
  dateTime: string;
  phoneNumber: string;
  contactName: string;
  status: string;
}
