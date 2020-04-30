import { SearchCondition, Paging } from './../../shared/model/search.model';
import { AgmInfoWindow } from '@agm/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Common } from '../../shared/common';
import { SearchBarService } from './../../index/service/search-bar.service';
import { SharedService } from './../../shared/shared.service';
import { PlaceQuickView } from 'src/app/shared/model/place.model';
declare var $: any;

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})

export class PlacesListComponent implements OnInit {
  places;
  searchCondition = new SearchCondition();
  paging = new Paging();
  showMap = false;
  location: Location;
  zoom = Common.ZOOM;
  previous: AgmInfoWindow;
  constructor(private searchService: SearchBarService, public sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.location = {
      latitude: -28.68352,
      longitude: -147.20785,
      zoom: this.zoom
    };
  }

  searchHandlerAtParrent(event) {
    this.searchCondition = event;
    this.searchCondition.amount = Common.PAGE_AMOUNT;
    this.getCountSearch();
  }

  getCountSearch() {
    this.searchService.getCountSearch(this.searchCondition).subscribe(
      (data: number) => {
        this.paging.countResult = data;
        if (data === 0) { // No result
          this.places = undefined;
          return;
        }
        this.paging.pages = Math.ceil(data / Common.PAGE_AMOUNT);
        this.gotoPage(Common.PAGE_DEFAULT);
      }
    );
  }

  gotoPage(currentPage: number) {
    this.previous = undefined;
    this.searchCondition.page = currentPage;
    this.paging.currentPage = currentPage;
    this.paging.pageAmount = Common.PAGE_AMOUNT;
    this.searchService.getPlacesBySearchCondition(this.searchCondition).subscribe(
      data => {
        this.places = data as PlaceQuickView[];
        this.location = {
          latitude: +this.places[0]?.latitude,
          longitude: +this.places[0]?.longtitude,
          zoom: this.zoom,
        };
        // make Maker Gmap
        this.places.forEach(place => place.animation = 'DROP');
      });

  }
  makerOver(maker) {
    maker.animation = 'BOUNCE';
  }
  makerOut(maker) {
    maker.animation = '';
  }

  clickedMarker(infowindow: AgmInfoWindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }
}

interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}
