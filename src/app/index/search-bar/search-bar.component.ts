import { SearchCondition } from './../../class/search-condition';
import { SearchBarService } from './../service/search-bar.service';
import { DistrictDB } from './../../class/district-db';
import { RoleOfPlace } from './../../class/role-of-place';
import { Component, OnInit, EventEmitter ,Output} from '@angular/core';
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() onSearch: EventEmitter<SearchCondition>;
  roleOfPlaces: Observable<RoleOfPlace>
  districts: Observable<DistrictDB>
  form: any
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
    priceMin: 0, priceMax: 999999999, text: "Khoảng giá"
  },
  {
    priceMin: 0, priceMax: 2000000, text: "< 2 triệu/tháng"
  },
  {
    priceMin: 2000000, priceMax: 5000000, text: "2- 5 triệu/tháng"
  },
  {
    priceMin: 5000000, priceMax: 10000000, text: "5-10 triệu/tháng"
  },
  {
    priceMin: 10000000, priceMax: 15000000, text: "10-15 triệu/tháng"
  },
  {
    priceMin: 15000000, priceMax: 20000000, text: "15-20 triệu/tháng"
  },
  {
    priceMin: 25000000, priceMax: 999999999, text: ">25 triệu/tháng"
  },
  ]

  constructor(private searchService: SearchBarService
  ) {
    this.onSearch = new EventEmitter()
   }

  ngOnInit(): void {
    this.searchService.getAllRole().subscribe(
      data => this.roleOfPlaces = data
    )
    this.searchService.getAllStatistic().subscribe(
      data => this.districts = data
    )
    // SearchCondition
    this.form = new FormGroup({
      title: new FormControl(''),
      roleOfPlaceID: new FormControl(-1),
      districtID: new FormControl(-1),
      areaRange: new FormControl(this.areaRanges[0]),
      priceRange: new FormControl(this.priceRanges[0]),
    });
    
  }


  searchForm() {
    const condition = new SearchCondition()
    condition.title = this.form.get('title').value
    condition.roleOfPlaceID = this.form.get('roleOfPlaceID').value
    condition.districtID = this.form.get('districtID').value
    condition.areaMax = this.form.get('areaRange').value.areaMax
    condition.areaMin = this.form.get('areaRange').value.areaMin
    condition.priceMax = this.form.get('priceRange').value.priceMax
    condition.priceMin = this.form.get('priceRange').value.priceMin

    this.onSearch.next(condition)
  }

  // reloadCurrentRoute(currentUrl: string, data: any) {
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate([currentUrl, data])
  //   })
  // }


}
