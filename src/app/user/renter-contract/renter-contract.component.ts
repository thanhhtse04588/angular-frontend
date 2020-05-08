import { UpdateOrderStatus } from './../../shared/model/order.model';
import { AuthenticationService } from './../../index/service/authentication.service';
import { AdminService } from './../../admin/admin.service';
import { Common, PlaceStatus, OrderStatus } from '../../shared/common';
import { SharedService } from '../../shared/service/shared.service';
import { UserService } from './../service/user.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { ContractStatus } from 'src/app/shared/common';
import { Contract } from 'src/app/shared/model/contract.model';
import { PayPaypal } from 'src/app/shared/model/payment.model';

@Component({
  selector: 'app-renter-contract',
  templateUrl: './renter-contract.component.html',
})
export class RenterContractComponent implements OnInit {
  @Input('ownerID') ownerID: number;
  contracts: Observable<Contract>;
  constructor(
    public userService: UserService, public sharedService: SharedService,
    private adminService: AdminService, public loginService: AuthenticationService) { }
  ngOnInit() {
    this.reload();
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
    this.adminService.changeStatusOrder(updateStatus).subscribe(
      data => data ? this.reload() : this.sharedService.loggerDialog(false)
    );
  }
  vndToUsd(vnd: number) {
    return Math.ceil(vnd / Common.USDtoVND);
  }
  reload() {
    const getInRenter = this.userService.getContractByRenterID(this.loginService.currentUserValue.userID);
    const getInOwner = this.userService.getContractByOwnerID(this.ownerID);

    (this.ownerID ? getInOwner : getInRenter).subscribe(
      data => this.contracts = data);
  }
}
