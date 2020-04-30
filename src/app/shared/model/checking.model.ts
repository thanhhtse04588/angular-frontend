export interface Checking {
    checkingID: number;
    placeID: number;
    statusPlaceID: number;
    userName: string;
    title: string;
    dateTime: string;
    phoneNumber: string;
    contactName: string;
    status: string;
    statusPlace: string;
    checkingStatusID: number;
}

export interface UpdateCheckingStatus {
    checkingID: number;
    placeID: number;
    statusCheckingID: number;
    statusPlaceID: number;
}
