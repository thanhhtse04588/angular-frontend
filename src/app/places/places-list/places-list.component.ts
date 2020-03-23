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
    private router: Router,private route: ActivatedRoute) { }

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
          console.log(this.places);
        }, error => console.log(error));

        // this.searchService.getPlacesBySearchCondition(
        //   this.route.snapshot.params['title'],
        //   this.route.snapshot.params['roleOfPlaceID'],
        //   this.route.snapshot.params['districtID'],
        //   this.route.snapshot.params['areaMax'],
        //   this.route.snapshot.params['areaMin'],
        //   this.route.snapshot.params['priceMax'],
        //   this.route.snapshot.params['priceMin']
        // ).subscribe(
        //   data => {
        //     this.places = data;
        //     console.log(data);
        //   }, error => console.log(error));
  }

  placeDetail(id: number) {
    this.router.navigate(['detail', id]);
  }

}
