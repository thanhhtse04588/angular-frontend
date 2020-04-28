import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appThanToday]'
})
export class ThanTodayDirective {
  constructor() { }
}
export function thanToday(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let value = new Date(control.value);
    let now = new Date();
    const oneYearLater = now.setFullYear(now.getFullYear()+1);
    // return isNaN(value.getTime()) || value <= new Date() ? { 'invalid': true } : null;
    return (value.getTime() >= Date.now() && value.getTime() <= oneYearLater)? null : {'invalid': true};
  }
}