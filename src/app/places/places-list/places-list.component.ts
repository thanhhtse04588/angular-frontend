import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs";
import { PlaceQuickView } from "../../class/place-quick-view";
import { SearchCondition, Paging } from './../../class/search-condition';
import { SearchBarService } from './../../index/service/search-bar.service';
declare var $: any;

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})

export class PlacesListComponent implements OnInit {
  places: Observable<PlaceQuickView>;
  searchCondition: SearchCondition;
  paging: Paging;
  PAGE_AMOUNT = 6;
  PAGE_DEFAULT = 0;
  showMap = false;
  location: Location

  constructor(private searchService: SearchBarService,
    private router: Router, private route: ActivatedRoute) {
    this.paging = new Paging();
  }

  ngOnInit(): void {
    this.location = {
      latitude: -28.68352,
      longitude: -147.20785,
      zoom: 15,
      markers: []
    }
  }

  searchHandlerAtParrent(event) {
    this.searchCondition = new SearchCondition();
    this.searchCondition = event
    this.paging.pageAmount = this.PAGE_AMOUNT
    this.searchCondition.amount = this.PAGE_AMOUNT
    this.getCountSearch()
    this.gotoPage(this.PAGE_DEFAULT)
  }
  addMarker(lat: number, lng: number, title: string, price: number, id: number,
    area: number,
    bedRooms: number,
    toilets: number) {
    this.location.markers.push({
      lat, lng, title, price, id, area, bedRooms, toilets
    })
  }


  getCountSearch() {
    this.searchService.getCountSearch(this.searchCondition).subscribe(
      (data: number) => {
        this.paging.countResult = data
        this.paging.pages = Math.ceil(data / this.PAGE_AMOUNT)

      }
    )
  }

  gotoPage(currentPage) {
    console.log("Page:" + currentPage)
    this.searchCondition.page = currentPage
    this.paging.currentPage = currentPage
    this.searchService.getPlacesBySearchCondition(this.searchCondition).subscribe(
      data => {
        this.places = data;

        this.location = {
          latitude: +this.places[0].latitude,
          longitude: +this.places[0].longtitude,
          zoom: 17,
          markers: []
        }
        this.places.forEach(place => this.addMarker(+place.latitude, +place.longtitude, place.title, place.price,
          place.placeID, place.area, place.bedRooms, place.toilets))
        // this.reloadCurrentRoute('search', this.searchCondition)
      });

  }

  shortTitle(title) {
    return title.substring(0, 65);
  }

  reloadCurrentRoute(currentUrl: string, data: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl, data])
    })
  }

  placeDetail(id: number) {
    this.router.navigate(['places/detail', id], { skipLocationChange: true });
  }
}
interface Marker {
  id: number;
  title: string;
  price: number;
  area: number;
  bedRooms: number;
  toilets: number;

  lat: number;
  lng: number;
}

interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
  markers: Array<Marker>;
}