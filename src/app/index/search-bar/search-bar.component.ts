import { SearchCondition } from './../../shared/model/search.model';
import { RoleOfPlace } from './../../shared/model/place.model';
import { DistrictDB } from './../../shared/model/local.model';
import { SearchBarService } from './../service/search-bar.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit {
  @Output() search: EventEmitter<SearchCondition>;
  roleOfPlaces: Observable<RoleOfPlace>;
  districts: Observable<DistrictDB>;
  form: FormGroup;
  areaRanges = [{
    areaMin: 0, areaMax: 999999999, text: 'Tất cả'
  },
  {
    areaMin: 0, areaMax: 30, text: '< 30m²'
  },
  {
    areaMin: 30, areaMax: 50, text: '30 - 50m²'
  },
  {
    areaMin: 50, areaMax: 80, text: '50 - 80m²'
  },
  {
    areaMin: 80, areaMax: 100, text: '80 - 100m²'
  },
  {
    areaMin: 100, areaMax: 999999999, text: '> 100m²'
  },
  ];

  priceRanges = [{
    priceMin: 0, priceMax: 999999999, text: 'Tất cả'
  },
  {
    priceMin: 0, priceMax: 2000000, text: '< 2 triệu/tháng'
  },
  {
    priceMin: 2000000, priceMax: 5000000, text: '2- 5 triệu/tháng'
  },
  {
    priceMin: 5000000, priceMax: 10000000, text: '5-10 triệu/tháng'
  },
  {
    priceMin: 10000000, priceMax: 15000000, text: '10-15 triệu/tháng'
  },
  {
    priceMin: 15000000, priceMax: 20000000, text: '15-20 triệu/tháng'
  },
  {
    priceMin: 20000000, priceMax: 999999999, text: '>20 triệu/tháng'
  },
  ];

  constructor(private searchService: SearchBarService
  ) {
    this.search = new EventEmitter();
  }

  ngOnInit(): void {
    this.searchService.getAllRole().subscribe(
      data => this.roleOfPlaces = data
    );
    this.searchService.getAllStatistic().subscribe(
      data => this.districts = data
    );
    // SearchCondition
    this.form = new FormGroup({
      title: new FormControl(''),
      roleOfPlaceID: new FormControl(-1),
      districtID: new FormControl(-1),
      areaRange: new FormControl(this.areaRanges[0]),
      priceRange: new FormControl(this.priceRanges[0]),
    });

  }
  searchForm(form) {
    form.title = form.title.trim().toLowerCase();
    form.areaMax = form.areaRange.areaMax;
    form.areaMin = form.areaRange.areaMin;
    form.priceMax = form.priceRange.priceMax;
    form.priceMin = form.priceRange.priceMin;
    this.search.next(form);
  }
  // reloadCurrentRoute(currentUrl: string, data: any) {
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate([currentUrl, data])
  //   })
  // }


}
