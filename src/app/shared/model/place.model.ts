import { DistrictDB, WardDB, StreetDB } from './local.model';

export interface Place {
    id: number;
    imageLarge: string;
    title: string;
    address: string;
    datePost: string;
    price: number;
    status: string;
    statusID: number;
}

export interface RoleOfPlace {
    roleOfPlaceID: number;
    roleName: string;
}

export interface PlaceQuickView {
    placeID: number;
    title: string;
    district: string;
    area: number;
    price: number;
    roleOfPlaceName: string;
    imageLarge: string;
    latitude: string;
    longtitude: string;
    bedRooms: number;
    toilets: number;
}

export interface ManagePostForm {
    id: number;
    imageLarge: string;
    title: string;
    address: string;
    datePost: string;
    price: number;
    status: string;
    statusID: number;
}

export class PlacePostForm {
    // page 1
    userID: number;
    title: string;
    roleOfPlaceID: number;
    districtID: number;
    wardID: number;
    streetID: number;
    district: DistrictDB;
    ward: WardDB;
    street: StreetDB;
    area: number;
    price: number;
    addressDetail: string;
    // page 2
    descriptions: string;
    // page3
    frontispiece: number;
    homeDirection: string;
    numberFloors: number;
    numberBedrooms: number;
    numberToilets: number;
    // page 4
    listEquip: Array<EquipmentListForm>;
    listCost: Array<CostOfPlaceForm> ;
    // page5
    listImageLink: Array<string>;
    // page6
    longtitude: number;
    latitude: number;
    // page 7
    contactName: string;
    contactAddress: string;
    phoneNumber: string;
    email: string;
    checkingDate: string;
}

export interface PlaceDetail {
    placeID: number;
    title: string;
    price: number;
    area: number;
    district: string;
    ward: string;
    street: string;
    address: string;
    longtitude: string;
    latitude: string;
    roleOfPlace: string;
    counterView: number;
    frontispiece: number;
    homeDirection: string;
    bedRooms: number;
    toilets: number;
    description: string;
    imageLarge: string;
    listImage: Array<string>;
    listEquip: Array<EquipmentListForm>;
    listCost: Array<CostOfPlaceForm>;
    statusPlace: string;
    statusPlaceID: number;
}

export interface EquipmentListForm {
    name: string;
    quantity: number;
    price: number;
    likeNew: number;
    equipmentDescrible: string;
}

export interface CostOfPlaceForm {
    costName: string;
    costPrice: number;
    unitID: number;
}

export interface CostUnitName {
    id: number;
    unitName: string;
}
