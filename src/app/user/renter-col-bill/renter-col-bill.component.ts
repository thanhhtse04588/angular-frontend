import { AuthenticationService } from './../../index/service/authentication.service';
import { COLBill } from 'src/app/class/cost-of-living.model';
import { Observable } from 'rxjs';
import { CostOfLivingBillService } from './../../shared/cost-of-living-bill.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-renter-col-bill',
  templateUrl: './renter-col-bill.component.html',
})
export class RenterColBillComponent implements OnInit {
bills: Observable<COLBill[]>;
bill: COLBill;
  constructor(private billService: CostOfLivingBillService, private loginService: AuthenticationService) { }

  ngOnInit(): void {

  }
reload(){
  const renterID = this.loginService.currentUserValue.userID;
 this.bills = this.billService.getBillsByRenterID(renterID);
}
}
