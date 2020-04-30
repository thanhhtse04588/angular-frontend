export interface Order {
    orderID: number;
    ordererID: number;
    contactName: string;
    name: string;
    email: string;
    phoneNumber: string;
    dateTime: string;
    address: string;
    message: string;
    status: string;
    placeID: number;
    statusPlace: string;
    statusPlaceID: number;
    orderStatusID: number;
    ownerID: number;
    price: number;
    title: string;

    placeStatus: string;
    orderStatus: string;
}

export interface UpdateOrderStatus {
    orderID: number;
    statusOrderID: number;
    placeID: number;
    statusPlaceID: number;
}


export interface InsertedOrderForm {
    ordererID: number;
    placeID: number;
    name: string;
    dateTime: string;
    email: string;
    phoneNumber: string;
    message: string;
}
