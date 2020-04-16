export class PlaceDetail {
    placeID: number;
    title: string;
    price: number;
    area: number;
    district: string;
    ward:string;
    street:string;
    address:string;
    longtitude: string;
    latitude: string;
    roleOfPlace: string;
    counterView: number;
    frontispiece:number;
    homeDirection: string;
    bedRooms:number;
    toilets:number;
    description: string;
    imageLarge:string;
    listImage: Array<string>;
    listEquip: Array<EquipmentListForm>;
    listCost: Array<CostOfPlaceForm>;
    statusPlace: string;
	statusPlaceID: number;
}

export class EquipmentListForm{
    name:string;
	quantity:number;
	price:number;
    likeNew:number;
    equipmentDescrible: string;
}

export class CostOfPlaceForm{
    costName:string;
    costPrice:number
}
 