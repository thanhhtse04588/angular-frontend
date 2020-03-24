import { SearchBarService } from './../../index/service/search-bar.service';
import { SearchCondition } from './../../class/search-condition';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { PlaceQuickView } from "../../class/place-quick-view";
import { Router,ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})
export class PlacesListComponent implements OnInit {
  places: Observable<PlaceQuickView[]>;
  searchCondition: SearchCondition;

  constructor(private searchService: SearchBarService,
    private router: Router,private route: ActivatedRoute) { 
      this.loadScripts();
    }

  ngOnInit(): void {
    this.searchCondition = new SearchCondition();
    this.searchCondition.title = this.route.snapshot.params['title'];
    this.searchCondition.roleOfPlaceID = this.route.snapshot.params['roleOfPlaceID'];
    this.searchCondition.districtID = this.route.snapshot.params['districtID'];
    this.searchCondition.areaMax = this.route.snapshot.params['areaMax']; 
    this.searchCondition.areaMin = this.route.snapshot.params['areaMin'];
    this.searchCondition.priceMax = this.route.snapshot.params['priceMax'];
    this.searchCondition.priceMin = this.route.snapshot.params['priceMin'];
      this.searchService.getPlacesBySearchCondition(this.searchCondition).subscribe(
        data => {
          this.places = data;
        }, error => console.log(error));

  }

  placeDetail(id: number) {
    this.router.navigate(['detail', id]);
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
