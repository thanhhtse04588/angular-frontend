

import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { PlaceService } from "../service/place.service";
import { PlaceQuickView } from "../../class/place-quick-view";
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-home',
  templateUrl: './place-home.component.html',
  styleUrls: ['./place-home.component.css']
})
export class PlaceHomeComponent implements OnInit {
  places: Observable<PlaceQuickView[]>;
  constructor(private placeService: PlaceService,
    private router: Router) { 
    }

  ngOnInit(): void {
    this.placeService.getPlacesTop6List().subscribe(
      data=> this.places=data
    );
  }

  placeDetail(id: number) {
    sessionStorage.setItem("placeID",id.toString())
    this.router.navigate(['places/detail']);
  }

  shortTitle(title) {
    return title.substring(0,65);
  }

  loadScripts() {
    const dynamicScripts = [];
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
