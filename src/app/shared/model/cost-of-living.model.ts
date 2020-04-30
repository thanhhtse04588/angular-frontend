
export interface COLBill {
    colId: number;
    contractId: number;
    renterId: number;
    ownerID: number;
    placeId: number;
    dateCollect: Date;
    totalExpense: number;
    paymentStatusId: number;
    paymentStatusName: string;
    placePrice: number;
    colBillDetails: Array<COLBillDetail>;
    cashPaidLink: string;
}

export interface COLBillDetail {
    colId: number;
    costId: number;
    amount: number;
    expensePerCost: number;
    costName: string;
    costPrice: number;
    unitName: string;
    unitID: number;
}

export interface COLBillUpdate {
    totalExpense: number;
    colBillDetails: Array<COLBillDetail>;
}

