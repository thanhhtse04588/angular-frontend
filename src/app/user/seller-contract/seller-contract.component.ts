import { AuthenticationService } from 'src/app/index/service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-contract',
  templateUrl: './seller-contract.component.html',
  styles: []
})
export class SellerContractComponent implements OnInit {
  ownerID: number;
  constructor(private loginService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.ownerID = this.loginService.currentUserValue.userID;
  }

}
