import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { PlaceService } from "../service/place.service";
import { PlaceQuickView } from "../../class/place-quick-view";
import { Router } from '@angular/router';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})
export class PlacesListComponent implements OnInit {
  places: Observable<PlaceQuickView[]>;

  constructor(private placeService: PlaceService,
    private router: Router) { }

  ngOnInit(): void {
    this.places = this.placeService.getPlacesTop6List();
  }

  placeDetail(id: number){
    this.router.navigate(['detail', id]);
  }

}
