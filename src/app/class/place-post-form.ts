export class PlacePostForm {
    // page 1
    userID: number
    title: String
    roleOfPlaceID: number
    districtID: number
    wardID: number
    streetID: number
    area: number
    price: number
    addressDetail: String
    // page 2
    descriptions: String
    // page3
    frontispiece: number
    homeDirection: String
    numberFloors: number
    numberBedrooms: number
    numberToilets: number
    // page 4
    listEquip: Array<EquipmentListForm>
    // page5
    listImageLink: Array<String>
    // page6
    longtitude: number
    latitude: number
    // page 7
    contactName: String
    contactAddress: String
    phoneNumber: String
    email: String
    checkingDate: String
}

export class EquipmentListForm {
    name: String
    quantity: number
    price: number
    likeNew: number
}