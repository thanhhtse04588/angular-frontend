import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private placeID  = new BehaviorSubject<number>(-1);
currentPlaceID = this.placeID.asObservable();

constructor() { }

 setPlaceID(id: number){
   this.placeID.next(id);
 }
}
