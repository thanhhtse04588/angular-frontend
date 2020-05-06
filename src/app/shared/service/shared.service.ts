import { MatSnackBar } from '@angular/material/snack-bar';

import { Injectable } from '@angular/core';
import { PlaceStatusColor, CheckingStatusColor, OrderStatusColor, BillStatusColor, ContractStatusColor } from '../common';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor( private _snackBar: MatSnackBar) { }

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

placeStatusColor(status: number){
  return PlaceStatusColor[status];
}
checkingStatusColor(status: number){
  return CheckingStatusColor[status];
}
orderStatusColor(status: number){
  return OrderStatusColor[status];
}
contractStatusColor(status: number){
  return ContractStatusColor[status];
}
billStatusColor(status: number){
  return BillStatusColor[status];
}

}
