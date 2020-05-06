import { HttpHeaders } from '@angular/common/http';
export enum Common {
  urlBase = 'http://localhost:8080',
  FAKESERVER = 'http://localhost:3000',
  roleAdmin = 1,
  PRICEORDER = 50,
  FEE = 2, // x2 PlacePrice
  ZOOM = 17,
  USDtoVND = 23442,
  MONTH = 2592000000,
  DAY = 86400000,
  PAGE_AMOUNT = 6,
  PAGE_DEFAULT = 0,
}

export const _OBSERVER = {
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

export const _httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export enum CostUnit {
  UNIT = 1,
  MOUNTH,
}

export enum PlaceStatus {
  CANCEL,
  ACTIVE,
  PENDING,
  DEACTIVE,
  RENTED,
  CHECKING,
}

export enum PlaceStatusColor {
  "dark",
  "success",
  "primary",
  "secondary",
  "danger",
  "warning",
}

export enum CheckingStatus {
  REJECT,
  APPROVE,
  PENDING,
}

export enum CheckingStatusColor {
  "dark",
  "success",
  "primary",
}

export enum OrderStatus {
  REJECT,
  APPROVE,
  PENDING,
  CONSIDER,
  DEAL,
}

export enum OrderStatusColor {
  "dark",
  "success",
  "primary",
  "warning",
  "danger",
}

export enum ContractStatus {
  DEACTIVE,
  ACTIVE,
  PENDING,
  CANCEL,
  BAN,
}

export enum ContractStatusColor {
  "secondary",
  "success",
  "primary",
  "muted",
  "danger",
}

export enum BillStatus {
  UNPAID,
  PAID,
  PENDING
}

export enum BillStatusColor {
  "danger",
  "success",
  "primary"
}
export enum IsUseService {
  NO,
  YES
}

export enum UserStatus {
  DEACTIVE,
  ACTIVE
}
