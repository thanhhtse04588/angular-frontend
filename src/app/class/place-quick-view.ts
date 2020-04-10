export class PlaceQuickView {
    placeID: number;
    title: string;
    district: string;
    area: number;
    price: number;
    roleOfPlaceName: string;
    imageLarge: string;
    latitude: string;
    longtitude: string;
    bedRooms: number
    toilets: number
}

export class ManagePostForm {
    id: number
    imageLarge: string;
    title: string;
    address: string;
    datePost: string;
    price: number;
    status: string;
    statusID: number;
}