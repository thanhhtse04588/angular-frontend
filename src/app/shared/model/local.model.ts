export interface DistrictDB {
    id: number;
    district: string;
    districtLatitude: string;
    districtLongitude: string;
}

export interface StreetDB {
    id: number;
    streetName: string;
}

export interface WardDB {
    id: number;
    wardName: string;
    wardLatitude: string;
    wardLongtitude: string;
}
