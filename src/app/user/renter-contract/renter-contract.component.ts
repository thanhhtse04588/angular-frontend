import { UpdateOrderStatus } from './../../shared/model/order.model';
import { AuthenticationService } from './../../index/service/authentication.service';
import { AdminService } from './../../admin/admin.service';
import { Common, PlaceStatus, OrderStatus } from '../../shared/common';
import { SharedService } from '../../shared/service/shared.service';
import { UserService } from './../service/user.service';
import { Observable, forkJoin } from 'rxjs';
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
  contracts: Observable<Contract[]>;
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
      description: 'Thanh toán đặt cọc hợp đồng thuê nhà',
      payFor: false,
      contractID: contract.contractID,
      placeID: contract.placeID,
      orderID: contract.orderID,
    };
    return pay;
  }

  getPayResult(result: PayPaypal) {
    if (result.payFor) {
      const updateStatus: UpdateOrderStatus = {
        orderID: result.orderID,
        placeID: result.placeID,
        statusOrderID: OrderStatus.APPROVE, // Approve
        statusPlaceID: PlaceStatus.RENTED // Active -> Rented
      };
      const changeStatusOrder = this.adminService.changeStatusOrder(updateStatus);
      const updateStatusContract = this.userService.updateStatusContract(result?.contractID, ContractStatus.ACTIVE, result?.placeID);
      forkJoin({ changeStatusOrder, updateStatusContract }).subscribe(status => {
        if (!status.changeStatusOrder || !status.updateStatusContract) {
          this.sharedService.loggerDialog(false, 'Có lỗi, liên hệ với chúng tôi để được hỗ trợ')
        }
        console.log(status);
      }, null, () => this.reload())
    }
  }

  vndToUsd(vnd: number) {
    return Math.ceil(vnd / Common.USDtoVND);
  }
  reload() {
    const getInRenter = this.userService.getContractByRenterID(this.loginService.currentUserValue.userID);
<<<<<<< HEAD
    const getInOwner = this.userService.getContractByOwnerID(this.ownerID).pipe(filter(contract => contract.contractStatusID != ContractStatus.PENDING));
=======
    const getInOwner = this.userService.getContractByOwnerID(this.ownerID);
>>>>>>> Dev-thanh-branch-frontend

    (this.ownerID ? getInOwner : getInRenter).subscribe(
      data => this.contracts = data);
  }
}
