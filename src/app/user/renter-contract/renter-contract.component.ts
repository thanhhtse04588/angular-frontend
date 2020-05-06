import { UpdateOrderStatus } from './../../shared/model/order.model';
import { AuthenticationService } from './../../index/service/authentication.service';
import { AdminService } from './../../admin/admin.service';
import { Common, PlaceStatus, OrderStatus } from '../../shared/common';
import { SharedService } from '../../shared/service/shared.service';
import { UserService } from './../service/user.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContractStatus } from 'src/app/shared/common';
import { Contract } from 'src/app/shared/model/contract.model';
import { PayPaypal } from 'src/app/shared/model/payment.model';

@Component({
  selector: 'app-renter-contract',
  templateUrl: './renter-contract.component.html',
})
export class RenterContractComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  contracts: Observable<Contract>;
  constructor(
    public userService: UserService, public sharedService: SharedService,
    private adminService: AdminService, public loginService: AuthenticationService) { }
  ngOnInit() {
    this.reload();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  isContractPending(status) {
    return status === ContractStatus.PENDING;
  }
  isPlaceActive(status) {
    return status === PlaceStatus.ACTIVE;
  }

  getPay(contract: Contract) {
    const pay: PayPaypal = {
      price: this.vndToUsd(contract.fee),
      description: 'Đặt cọc tiền hợp đồng thuê nhà',
      payFor: false,
      contractID: contract.contractID,
      placeID: contract.placeID,
      orderID: contract.orderID,
    };
    return pay;
  }

  getPayResult(result: PayPaypal) {
    if (result.payFor) {
      this.userService.updateStatusContract(result?.contractID, ContractStatus.ACTIVE, result?.placeID).subscribe(
        data => {
          if (data) {
            this.sharedService.loggerDialog(true, 'Thanh toán tiền đặt cọc thuê nhà thành công'),
              this.onApproveDeal(result);
          } else {
            this.sharedService.loggerDialog(false, 'Có lỗi, liên hệ với chúng tôi để được hỗ trợ')
          }
        }
        , (err) => this.sharedService.loggerDialog(false, 'Có lỗi, liên hệ với chúng tôi để được hỗ trợ')
        , () => this.reload()
      );
    }
  }

  onApproveDeal(pay: PayPaypal) {
    const updateStatus: UpdateOrderStatus = {
      orderID: pay.orderID,
      placeID: pay.placeID,
      statusOrderID: OrderStatus.APPROVE, // Approve
      statusPlaceID: PlaceStatus.RENTED // Active -> Rented
    };
    this.subs.add(this.adminService.changeStatusOrder(updateStatus).subscribe(
      data => data ? this.reload() : this.sharedService.loggerDialog(false)
    ));
  }

  vndToUsd(vnd: number) {
    return Math.ceil(vnd / Common.USDtoVND);
  }
  reload() {
    this.subs.add(this.userService.getContractByRenterID(this.loginService.currentUserValue.userID).subscribe(
      data => {
        this.contracts = data;
      }
    ));
  }
}
