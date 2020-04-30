import { Common } from '../../shared/common';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  getPlacesTop6List(): Observable<any> {
    return this.http.get(`${Common.urlBase}/api/cp/places/top6`);
  }

  getPlaceDetail(id: number): Observable<any> {
    return this.http.get(`${Common.urlBase}/api/cp/places/${id}`);
  }
  getImageListByPlaceID(id: number): Observable<any> {
    return this.http.get(`${Common.urlBase}/api/cp/places/images/${id}`);
  }
  getStatusByPlaceID(placeid): Observable<number> {
    return this.http.get<number>(`${Common.urlBase}/api/cp/places/checkplace?placeid=${placeid}`);
  }

  insertPlace(form): Observable<any> {
    return this.http.post(`${Common.urlBase}/api/cp/places/insert-places`, JSON.stringify(form),  Common.httpOptions);
  }

  getWardIDByDistrictID(id): Observable<any> {
    return this.http.get(`${Common.urlBase}/warddb/getallwardbydistrict?districtid=${id}`);
  }

  getStreetIDByDistrictID(id): Observable<any> {
    return this.http.get(`${Common.urlBase}/street/getstreetbydistrict?districtid=${id}`);
  }

  getCostUnit(): Observable<any> {
    return this.http.get(`${Common.urlBase}/costunitname/getAllCostUnitName`);
  }

  getCountOrderPendingByPlaceID(id): Observable<any> {
    return this.http.get(`${Common.urlBase}/manageorder/count-order-pending?placeID=${id}`);
  }




}
