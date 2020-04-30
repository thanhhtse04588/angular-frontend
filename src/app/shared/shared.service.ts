import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor() { }

placeDetail(id: number) {
  sessionStorage.setItem('placeID', id.toString());
  window.open('places/detail', '_blank');
}
openLinkNewTab(url: string) {
  window.open(url, '_blank');
}

checkValidateInput(formControlName) {
  return formControlName.invalid && (formControlName.dirty || formControlName.touched);
}

}
