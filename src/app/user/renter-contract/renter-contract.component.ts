import { AdminService } from './../../admin/admin.service';
import { async } from '@angular/core/testing';
import { Common, PlaceStatus, OrderStatus } from './../../class/common';

import { SharedService } from './../../shared/shared.service';
import { UserService } from './../service/user.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ContractStatus } from 'src/app/class/common';

@Component({
  selector: 'app-renter-contract',
  templateUrl: './renter-contract.component.html',
  styleUrls: ['./renter-contract.component.css']
})
export class RenterContractComponent implements OnInit, OnDestroy, AfterViewInit {
  private subs = new Subscription();
  contracts: Observable<Contract>;
  constructor(private userService: UserService, public sharedService: SharedService, private adminService: AdminService) { }

  ngOnInit() {
    this.reload();
  }
  ngAfterViewInit() {
  }
  isContractPending(status) {
    return status == ContractStatus.PENDING;
  }
  isPlaceActive(status) {
    return status == PlaceStatus.ACTIVE;
  }

  statusContractColor(status) {
    switch (status) {
      case ContractStatus.DEACTIVE: return "grey";
      case ContractStatus.ACTIVE: return "green";
      case ContractStatus.PENDING: return "cyan";
      default: return "grey";
    }
  }

  getPay(contract: Contract) {
    const pay: Pay = {
      price: this.vndToUsd(contract.fee),
      description: 'Đặt cọc tiền hợp đồng thuê nhà',
      payFor: false,
      contractID: contract.contractID,
      placeID: contract.placeID,
      orderID: contract.orderID,
    }
    return pay;
  }

  getPayResult(result: Pay) {
    if (result.payFor) {
      this.subs.add(this.userService.updateStatusContract(result?.contractID, ContractStatus.ACTIVE,result?.placeID).subscribe(
        data => {
          if (data) {
            alert('Thanh toán tiền đặt cọc thuê nhà thành công');
            this.onApproveDeal(result)
          } else {
            alert('Có lỗi, liên hệ với chúng tôi để được hỗ trợ');
          }
        }
        , (err) => alert('Có lỗi, liên hệ với chúng tôi để được hỗ trợ')
        , () => this.reload()
      ))
    }
  }

  onApproveDeal(pay: Pay) {
    const updateStatus: UpdateStatus = {
      orderID: pay.orderID,
      placeID: pay.placeID,
      statusOrderID: OrderStatus.APPROVE, // Approve
      statusPlaceID: PlaceStatus.RENTED // Active -> Rented
    }
    this.subs.add(this.adminService.changeStatusOrder(updateStatus).subscribe(
      data => data ? this.reload() : alert("Thao tác không thành công!")
    ))
  }

  vndToUsd(vnd: number) {
    return Math.ceil(vnd / Common.USDtoVND);
  }
  reload() {
    this.subs.add(this.userService.getContractByRenterID(+sessionStorage.getItem("userID")).subscribe(
      data => {
        this.contracts = data
        console.log(this.contracts)
      }
    ))
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}


export interface Contract {
  placeID: number,
  titlePlace: string,
  contractID: number,
  ownerID: number,
  renterID: number,
  startDate: string,
  endDate: string,
  fee: number,
  contractStatusID: number,
  statusContract: string,
  placeStatusID: number,
  orderID: number,
  placeStatus: string,
}

interface Pay {
  price: number,
  description: string,
  payFor: boolean,
  contractID: number,
  placeID: number,
  orderID: number,
}
export interface UpdateStatus {
  orderID: number,
  statusOrderID: number,
  placeID: number,
  statusPlaceID: number,
}