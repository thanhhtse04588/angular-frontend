import { PlaceDetail } from './../../class/place-detail';
import { PlaceService } from './../service/place.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
  id:number;
  place: PlaceDetail;

  constructor(private route: ActivatedRoute,private router: Router, private placeService: PlaceService) { }

  ngOnInit() {
    this.place = new PlaceDetail();

    this.id = this.route.snapshot.params['id'];
    
    this.placeService.getPlaceDetail(this.id)
      .subscribe(data => {
        console.log(data)
        this.place = data;
      }, error => console.log(error));
  }

  

}