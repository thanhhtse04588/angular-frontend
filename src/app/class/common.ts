export class Common {
    public static urlBase = 'http://localhost:8080';
    public static roleAdmin = 1;
    public static PRICEORDER = 50;
}

export class PlaceStatus {
    public static CANCEL = 0;
    public static ACTIVE = 1;
    public static PENDING = 2;
    public static DEACTIVE = 3;
    public static RENTED = 4;
    public static CHECKING = 5;
}

export class BookingStatus{
    public static REJECT =0;
    public static APPROVE =1;
    public static PENDING =2;
}

export class OrderStatus{
    public static REJECT =0;
    public static APPROVE =1;
    public static PENDING =2;
}