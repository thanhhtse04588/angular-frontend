import { HttpHeaders } from '@angular/common/http';
export class Common {
  public static urlBase = 'http://localhost:8080';
  public static FAKESERVER = 'http://localhost:3000';
  public static roleAdmin = 1;
  public static PRICEORDER = 50;
  public static FEE = 2; // x2 PlacePrice
  public static ZOOM = 17;
  public static USDtoVND = 23442;
  public static MONTH = 2592000000;
  public static DAY = 86400000;
  public static PAGE_AMOUNT = 6;
  public static PAGE_DEFAULT = 0;
  public static OBSERVER = {
    next(res) {
      (res === false) ? alert('Lỗi! ,Thao tác không thành công!') : alert('Thao tác thành công');
    },
    error(err) {
      alert('Lỗi! ,Thao tác không thành công!');
    },
    complete() {
      console.log('completed');
    }
  };

  public static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
}

export class PlaceStatus {
  public static CANCEL = 0;
  public static ACTIVE = 1;
  public static PENDING = 2;
  public static DEACTIVE = 3;
  public static RENTED = 4;
  public static CHECKING = 5;
}
export class CostUnit {
  public static UNIT = 1;
  public static MOUNTH = 2;
}

export class BookingStatus {
  public static REJECT = 0;
  public static APPROVE = 1;
  public static PENDING = 2;
}

export class OrderStatus {
  public static REJECT = 0;
  public static APPROVE = 1;
  public static PENDING = 2;
  public static CONSIDER = 3;
  public static DEAL = 4;
}
export class ContractStatus {
  public static DEACTIVE = 0;
  public static ACTIVE = 1;
  public static PENDING = 2;
  public static CANCEL = 3;
  public static BAN = 4;
}

export enum BillStatus {
  UNPAID,
  PAID,
  PENDING
}
export enum IsUseService {
  NO,
  YES
}
