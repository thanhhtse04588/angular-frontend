export class SearchCondition {
    title: string;
    roleOfPlaceID: number;
    districtID: number;
    areaMax: number;
    areaMin: number;
    priceMax: number;
    priceMin: number;
    page: number;
    amount: number;
}

export class Paging {
    countResult: number;
    pageAmount: number;
    currentPage: number;
    pages: number;
}
