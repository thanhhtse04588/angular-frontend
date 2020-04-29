import { Common } from './../../class/common';
import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appThanToday]'
})
export class ThanTodayDirective {
  constructor() { }
}
export const endDateThanOneMonthStartDate: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const startTime = new Date(control.get('startDate').value);
  const endTime = new Date(control.get('endDate').value);
  const compare = endTime.getTime() - startTime.getTime();

  return (compare <= Common.MONTH) ? { 'invalidEndDate': true } : null; // 
};

export function thanToday(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let value = new Date(control.value);
    let now = new Date();
    const oneYearLater = now.setFullYear(now.getFullYear()+1);
    
    return (value.getTime() >= Date.now() && value.getTime() <= oneYearLater)? null : {'invalid': true};
  }
}