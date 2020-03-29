import { SearchCondition } from './../../class/search-condition';
import { SearchBarService } from './../service/search-bar.service';
import { DistrictDB } from './../../class/district-db';
import { RoleOfPlace } from './../../class/role-of-place';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
declare var $: any;


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  roleOfPlaces: Observable<RoleOfPlace>
  districts: Observable<DistrictDB>
  areaRanges = [{
    areaMin: 0, areaMax: 99999, text: "Diện tích"
  },
  {
    areaMin: 0, areaMax: 30, text: "< 30m²"
  },
  {
    areaMin: 30, areaMax: 50, text: "30 - 50m²"
  },
  {
    areaMin: 50, areaMax: 80, text: "50 - 80m²"
  },
  {
    areaMin: 80, areaMax: 100, text: "80 - 100m²"
  },
  {
    areaMin: 100, areaMax: 99999, text: "> 100m²"
  },
  ]

  priceRanges = [{
    priceMin: 0, priceMax: 99999, text: "Khoảng giá"
  },
  {
    priceMin: 0, priceMax: 5, text: "< 5 triệu/tháng"
  },
  {
    priceMin: 5, priceMax: 10, text: "5-10 triệu/tháng"
  },
  {
    priceMin: 10, priceMax: 15, text: "10-15 triệu/tháng"
  },
  {
    priceMin: 15, priceMax: 20, text: "15-20 triệu/tháng"
  },
  {
    priceMin: 25, priceMax: 99999, text: ">25 triệu/tháng"
  },
  ]

  constructor(private searchService: SearchBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.roleOfPlaces = this.searchService.getAllRole()
    this.districts = this.searchService.getAllStatistic()
  }

  // SearchCondition
  private searchCondition = new SearchCondition();

  form = new FormGroup({
    title: new FormControl(),
    roleOfPlaceID: new FormControl(-1),
    districtID: new FormControl(-1),
    areaRange: new FormControl(this.areaRanges[0]),
    priceRange: new FormControl(this.priceRanges[0]),
  });

  searchForm() {
    if (this.form.get('title').value === null) {
      this.searchCondition.title = ""
    } else {
      this.searchCondition.title = this.form.get('title').value
    }

    this.searchCondition.roleOfPlaceID = this.form.get('roleOfPlaceID').value
    this.searchCondition.districtID = this.form.get('districtID').value
    this.searchCondition.areaMax = this.form.get('areaRange').value.areaMax
    this.searchCondition.areaMin = this.form.get('areaRange').value.areaMin
    this.searchCondition.priceMax = this.form.get('priceRange').value.priceMax
    this.searchCondition.priceMin = this.form.get('priceRange').value.priceMin

    this.reloadCurrentRoute('search', this.searchCondition)
  }

  reloadCurrentRoute(currentUrl: string, data: any) {
    // let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl, data])
    })
  }


}
