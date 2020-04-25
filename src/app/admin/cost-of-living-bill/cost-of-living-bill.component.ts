import { COLBillDetail } from './../../class/cost-of-living.model';
import { ModalDirective } from 'angular-bootstrap-md';
import { CostOfLivingBillService } from './../../shared/cost-of-living-bill.service';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from './../../shared/shared.service';
import { UserService } from './../../user/service/user.service';
import { AdminService } from './../admin.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { COLBill } from 'src/app/class/cost-of-living.model';

@Component({
  selector: 'app-cost-of-living-bill',
  templateUrl: './cost-of-living-bill.component.html',
  styleUrls: ['./cost-of-living-bill.component.css']
})
export class CostOfLivingBillComponent implements OnInit {
  @ViewChild('fillFormModal',{static: true}) fillFormModal: ModalDirective; 
  billDetail = [];
  private subs = new Subscription();
  displayedColumns: string[] = ['colId', 'renterId', 'ownerID', 'dateCollect', 'totalExpense', 'paymentStatusName', 'void'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  bills: COLBill[];
  
  constructor(private adminService: AdminService,
    private userService: UserService,
    public sharedService:SharedService,
    private billService: CostOfLivingBillService) { }

  ngOnInit(): void {
    this.totalLoad()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onFillForm(bill: COLBill){
    this.subs.add(this.billService.getBillDetailByBillID(bill.colId).subscribe(
      data => this.billDetail = data as COLBillDetail[]
    ))
this.fillFormModal.show()
  }
  onSave(){
    this.subs.add(this.billService.updateBillDetail(this.billDetail).subscribe(
      data=> data? alert("Thành công!"):alert("Thất bại!")))
      ,null,()=> this.fillFormModal.hide()
  }
  updateCurrentData(){

  }

  totalLoad() {
    this.subs.add(this.billService.getAllBill().subscribe(
      data => {
        this.bills =(data as COLBill[])
        this.dataSource = new MatTableDataSource<COLBill>(this.bills);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
    )
  }

  
  

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
