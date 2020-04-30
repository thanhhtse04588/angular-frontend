import { PlaceQuickView } from 'src/app/shared/model/place.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceService } from '../service/place.service';

@Component({
  selector: 'app-place-home',
  templateUrl: './place-home.component.html',
})
export class PlaceHomeComponent implements OnInit {
  imgSlide = [
    '../../assets/img/house/white-single-story-houses-beside-body-of-water-1438832.jpg',
    '../../assets/img/house/architecture-beautiful-home-building-class-280229.jpg',
    '../../assets/img/house/white-and-red-wooden-house-with-fence-1029599.jpg'
  ];
  places: Observable<PlaceQuickView[]>;
  constructor(private placeService: PlaceService) {
  }

  ngOnInit(): void {
    this.placeService.getPlacesTop6List().subscribe(
      data => this.places = data
    );
  }
}
