import { BillStatus } from './../../class/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deadlineBill'
})
export class DeadlineBillPipe implements PipeTransform {

  transform(value: Date, status: number): string {
    const deadline = new Date(value.valueOf());

    if ([BillStatus.PAID,BillStatus.PENDING].includes(status)) return "";
    const aDay = 86400000;
    const days = (deadline.getTime() - Date.now()) / aDay;
    
    if (days >= 0) {
      if (days > 30) return " ";
      return `Còn ${Math.floor(days)} ngày`
    }
    return `Quá ${Math.floor(-days)} ngày`
  }

}
