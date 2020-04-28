import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'billStatusName'
})
export class BillStatusNamePipe implements PipeTransform {

  transform(value: number): string {
    const billStatusName =[
      "Chưa thanh toán","Đã thanh toán","Chưa xử lý"
  ]
    return billStatusName[value] ;
  }

}
