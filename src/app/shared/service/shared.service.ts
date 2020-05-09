import { Router } from '@angular/router';
import { LoggerDialogComponent } from './../../index/logger-dialog/logger-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Injectable } from '@angular/core';
import { PlaceStatusColor, CheckingStatusColor, OrderStatusColor, BillStatusColor, ContractStatusColor } from '../common';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog,private router: Router,) { }

  placeDetail(id: number) {
    sessionStorage.setItem('placeID', id.toString());
    window.open('places/detail', '_blank');
  }
  checkValidateInput(formControlName) {
    return formControlName.invalid && (formControlName.dirty || formControlName.touched);
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }

  loggerDialog(status: boolean, mess?: string, redirect?:string): void {
    const message = mess ? mess : (status ? 'Thao tác thành công' : 'Thao tác không thành công')
    const dialogRef = this.dialog.open(LoggerDialogComponent, {
      width: '250px',
      data: { status: status, mess: message },
      hasBackdrop: false,
    })
    
    redirect && dialogRef.afterClosed().pipe(finalize(() => this.router.navigate([redirect]))).subscribe();
  }

  placeStatusColor(status: number) {
    return PlaceStatusColor[status];
  }
  checkingStatusColor(status: number) {
    return CheckingStatusColor[status];
  }
  orderStatusColor(status: number) {
    return OrderStatusColor[status];
  }
  contractStatusColor(status: number) {
    return ContractStatusColor[status];
  }
  billStatusColor(status: number) {
    return BillStatusColor[status];
  }

}
