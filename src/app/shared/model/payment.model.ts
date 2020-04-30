export interface PayPaypal {
    price: number;
    description: string;
    payFor: boolean;
    contractID?: number;
    placeID: number;
    orderID?: number;
    colId?: number;
  }

export interface Payment {
  userID: number;
  placeID: number;
  orderID: string;
  status: string;
  payerID: string;
  money: number;
  description: string;
  createTime: string;
}
