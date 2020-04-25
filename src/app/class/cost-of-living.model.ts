export interface COLBill {
    colId: number;
    contractId: number;
    renterId: number;
    ownerID:number;
    placeId: number;
    dateCollect: Date;
    totalExpense: number;
    paymentStatusId: number;
    paymentStatusName: string;
}

export interface COLBillDetail{
    colId: number;
    costId: number;
    amount: number;
    expensePerCost: number;

    costName: string;
    costPrice: number;
    unitName: string
}

