import { MatTableDataSource } from '@angular/material/table';
import { ContractStatus } from 'src/app/class/common';
import { SharedService } from './../../shared/shared.service';
import { UserService } from './../../user/service/user.service';
import { AdminService } from './../admin.service';
import { Contract } from './../../user/renter-contract/renter-contract.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  private subs = new Subscription();
  displayedColumns: string[] = ['placeID', 'contractID', 'ownerID', 'renterID', 'startDate', 'endDate','placeStatus','statusContract', 'void'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
contracts : Contract[];
contractSelected: Contract;
  constructor(private adminService: AdminService,
    private userService: UserService,
    public sharedService:SharedService) { }

  ngOnInit() {
    this.reload()
  }
  reload() {
    this.subs.add(this.adminService.getAllContract().subscribe(
      data => {
          this.contracts = data as Contract[];
        this.dataSource = new MatTableDataSource<Contract>(this.contracts);
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
  showBtn(status: number){
return ![ContractStatus.CANCEL,ContractStatus.PENDING].includes(status);
  }

  isBanContract(status: number){
    return status == ContractStatus.BAN;
      }
onAccept(){
  this.subs.add(this.userService.updateStatusContract(
    this.contractSelected.contractID, 
    (this.contractSelected.contractID==ContractStatus.BAN)? ContractStatus.ACTIVE: ContractStatus.BAN,
    this.contractSelected.placeID).subscribe(
    data => data? alert('Thao tác thành công'):alert('Có lỗi')
    , (err) => alert('Có lỗi')
    , () => this.reload()
  ))
}
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
