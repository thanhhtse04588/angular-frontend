export class PlacePostForm {
    // page 1
    userID: number
    title: string
    roleOfPlaceID: number
    districtID: number
    wardID: number
    streetID: number
    area: number
    price: number
    addressDetail: string
    // page 2
    descriptions: string
    // page3
    frontispiece: number
    homeDirection: string
    numberFloors: number
    numberBedrooms: number
    numberToilets: number
    // page 4
    listEquip: Array<EquipmentListForm>
    listCost: Array<CostOfPlaceForm> ;
    // page5
    listImageLink: Array<string>
    // page6
    longtitude: number
    latitude: number
    // page 7
    contactName: string
    contactAddress: string
    phoneNumber: string
    email: string
    checkingDate: string
}
export class UpdatePostForm {
    // page 1
    placeID: number
    title: string
    roleOfPlaceID: number
    districtID: number
    wardID: number
    streetID: number
    area: number
    price: number
    addressDetail: string
    // page 2
    descriptions: string
    // page3
    frontispiece: number
    homeDirection: string
    numberFloors: number
    numberBedrooms: number
    numberToilets: number
    // page 4
    listEquip: Array<EquipmentListForm>
    // page5
    listImageLink: Array<string>
    // page6
    longtitude: number
    latitude: number
    // page 7
    contactName: string
    contactAddress: string
    phoneNumber: string
    email: string
    checkingDate: string
}

class EquipmentListForm {
    name: string
    quantity: number
    price: number
    likeNew: number
}
class CostOfPlaceForm {
    costName:number;
	costPrice: string;
}