import { PlaceQuickView } from './../../class/place-quick-view';
import { SharedService } from './../../shared/shared.service';
import { Common } from './../../class/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router } from '@angular/router';
import { SearchCondition, Paging } from './../../class/search-condition';
import { SearchBarService } from './../../index/service/search-bar.service';

declare var $: any;

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})

export class PlacesListComponent implements OnInit {
  @Output() onSearch = new EventEmitter<boolean>();
  places;
  searchCondition: SearchCondition;
  paging: Paging;
  PAGE_AMOUNT = 6;
  PAGE_DEFAULT = 0;
  showMap = false;
  location: Location;
  zoom = Common.ZOOM;
  previous;
  constructor(private searchService: SearchBarService,
    private router: Router,public sharedService:SharedService ) {
    this.paging = new Paging();
  }

  ngOnInit(): void {
    this.location = {
      latitude: -28.68352,
      longitude: -147.20785,
      zoom: this.zoom
    }
  }

  searchHandlerAtParrent(event) {
    this.searchCondition = new SearchCondition();
    this.searchCondition = event;
    this.paging.pageAmount = this.PAGE_AMOUNT;
    this.searchCondition.amount = this.PAGE_AMOUNT;
    this.getCountSearch();
    this.onSearch.next(true);
  }


  getCountSearch() {
    this.searchService.getCountSearch(this.searchCondition).subscribe(
      (data: number) => {
        this.paging.countResult = data;
        if (data == 0) { // No result
          this.places = undefined;
          return;
        }
        this.paging.pages = Math.ceil(data / this.PAGE_AMOUNT);
        this.gotoPage(this.PAGE_DEFAULT);
      }
    )
  }

  gotoPage(currentPage: number) {
    this.searchCondition.page = currentPage
    this.paging.currentPage = currentPage
    this.searchService.getPlacesBySearchCondition(this.searchCondition).subscribe(
      data => {
        this.places = data as PlaceQuickView[];
        this.location = {
          latitude: +this.places[0]?.latitude,
          longitude: +this.places[0]?.longtitude,
          zoom: this.zoom,
        }
        // make Maker Gmap
        this.places.forEach(place => place.animation = "DROP");
      });

  }
  makerOver(maker){
    maker.animation ="BOUNCE";
  }
  makerOut(maker){
    maker.animation ="";
  }

  clickedMarker(infowindow) {
    if (this.previous) {
        this.previous.close();
    }
    this.previous = infowindow;
 }


  // reloadCurrentRoute(currentUrl: string, data: any) {
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate([currentUrl, data])
  //   })
  // }
}

interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}