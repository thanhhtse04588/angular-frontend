import { BillStatus, Common } from '../common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deadlineBill'
})
export class DeadlineBillPipe implements PipeTransform {

  transform(value: Date, status: number): string {
    const deadline = new Date(value.valueOf());

    if ([BillStatus.PAID, BillStatus.PENDING].includes(status)) { return ''; }
    const days = (deadline.getTime() - Date.now()) / Common.DAY;

    if (days >= 0) {
      if (days > 30) { return ' '; }
      return `Còn ${Math.floor(days)} ngày`;
    }
    return `Quá ${Math.floor(-days)} ngày`;
  }

}
