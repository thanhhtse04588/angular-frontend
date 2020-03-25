import { Observable } from 'rxjs';
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
  images: Observable<any>;

  constructor(private route: ActivatedRoute,private router: Router, private placeService: PlaceService) { 
    this.loadScripts();
  }

  ngOnInit() {
    this.place = new PlaceDetail();

    this.id = this.route.snapshot.params['id'];

    this.placeService.getImageListByPlaceID(this.id)
    .subscribe(data => {
      this.images = data;
    }, error => console.log(error));

    this.placeService.getPlaceDetail(this.id)
      .subscribe(data => {
        this.place = data;
      }, error => console.log(error));
  }

  loadScripts() {
    const dynamicScripts = [
     '../../../assets/template_library/js/custom.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

}
