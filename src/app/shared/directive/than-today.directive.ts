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
    return isNaN(value.getTime()) || value <= new Date() ? { 'invalid': true } : null;
  }
}