import { finalize } from 'rxjs/operators';
import { Order } from 'src/app/shared/model/order.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateOrderStatus } from './../../../shared/model/order.model';
import { Contract } from './../../../shared/model/contract.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { thanToday } from 'src/app/shared/directive/than-today.directive';
import { SharedService } from './../../../shared/service/shared.service';
import { AdminService } from './../../admin.service';
import { endDateThanOneMonthStartDate } from './../../../shared/directive/than-today.directive';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContractStatus, OrderStatus, PlaceStatus, IsUseService } from './../../../shared/common';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styles: []
})
export class ContractFormComponent implements OnInit {
  link: string;
  fileName: string;
  formContract: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ContractFormComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order, private adminService: AdminService, public sharedService: SharedService, private storage: AngularFireStorage) {
  }
  ngOnInit(): void {
    this.formContract = new FormGroup({
      contractLink: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required, thanToday()]),
      endDate: new FormControl('', [Validators.required]),
      fee: new FormControl('', [Validators.required, Validators.min(0)]),
      isUseService: new FormControl('', [Validators.required]),
    }, { validators: endDateThanOneMonthStartDate });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onFileSelected(event) {
    console.log(event);

    const n = Date.now();
    const file = event.target.files[0];
    this.fileName = file.name;
    const filePath = `contracts/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`contracts/${n}`, file);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(url => this.link = url);
    })).subscribe();
  }
  sendDeal(form) {
    let contract = new Contract();
    contract = form;
    contract.ownerID = this.order.ownerID;
    contract.renterID = this.order.ordererID;
    contract.placeID = this.order.placeID;
    contract.orderID = this.order.orderID;
    contract.contractLink = this.link;
    contract.isUseService = contract.isUseService ? IsUseService.YES : IsUseService.NO;
    contract.contractStatusID = ContractStatus.PENDING,
      this.adminService.createContract(contract).subscribe(is => is ? this.onApprove() : alert('Thao tác không thành công'));
  }
  onApprove() {
    let updateStatus: UpdateOrderStatus;
    updateStatus = {
      orderID: this.order.orderID,
      placeID: this.order.placeID,
      statusOrderID: OrderStatus.DEAL, // Approve
      statusPlaceID: PlaceStatus.ACTIVE // Active -> ACtive
    };
    this.adminService.changeStatusOrder(updateStatus).subscribe(
      data => {
        if (data) {
          this.sharedService.loggerDialog(true);
          this.dialogRef.close();
        } else { alert('Lỗi! Thao tác không thành công!'); }
      }
    );
  }
  get contractLink() { return this.formContract.get('contractLink'); }

  get startDate() { return this.formContract.get('startDate'); }

  get endDate() { return this.formContract.get('endDate'); }

  get fee() { return this.formContract.get('fee'); }

  get isUseService() { return this.formContract.get('isUseService'); }
}
