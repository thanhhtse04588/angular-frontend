import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor() { }

placeDetail(id: number) {
  sessionStorage.setItem("placeID",id.toString())
  // this.router.navigate(['places/detail']);
  window.open('places/detail', "_blank");
}

checkValidateInput(formControlName){
  return formControlName.invalid && (formControlName.dirty || formControlName.touched);
}

}
