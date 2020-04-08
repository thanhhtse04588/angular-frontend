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
  places: Observable<PlaceQuickView[]>
  searchCondition: SearchCondition
  paging: Paging
  PAGE_AMOUNT = 6
  PAGE_DEFAULT = 0

  constructor(private searchService: SearchBarService,
    private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paging = new Paging();
    this.paging.pageAmount = this.PAGE_AMOUNT

    this.searchCondition = new SearchCondition();
    this.searchCondition.amount = this.PAGE_AMOUNT

    this.searchCondition.title = this.route.snapshot.params['title']
    this.searchCondition.roleOfPlaceID = this.route.snapshot.params['roleOfPlaceID']
    this.searchCondition.districtID = this.route.snapshot.params['districtID']
    this.searchCondition.areaMax = this.route.snapshot.params['areaMax']
    this.searchCondition.areaMin = this.route.snapshot.params['areaMin']
    this.searchCondition.priceMax = this.route.snapshot.params['priceMax']
    this.searchCondition.priceMin = this.route.snapshot.params['priceMin']

    this.getCountSearch()
    this.gotoPage(this.PAGE_DEFAULT)

  }

  getCountSearch() {
    this.searchService.getCountSearch(this.searchCondition).subscribe(
      (data: number) => {
        this.paging.countResult = data
        this.paging.pages = Math.ceil(data/this.PAGE_AMOUNT)
        
      }
    )
  }

  gotoPage(currentPage) {
    console.log("Page:"+currentPage)
    this.searchCondition.page = currentPage
    this.paging.currentPage = currentPage
    this.searchService.getPlacesBySearchCondition(this.searchCondition).subscribe(
      data => {
        this.places = data;
        // this.reloadCurrentRoute('search', this.searchCondition)
      });

  }

  shortTitle(title) {
    return title.substring(0,65);
  }

  reloadCurrentRoute(currentUrl: string, data: any) {
    // let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl, data])
    })
  }

  placeDetail(id: number) {
    this.router.navigate(['detail', id],{skipLocationChange: true});
  }


  // loadScripts() {
  //   const dynamicScripts = [];
  //   for (let i = 0; i < dynamicScripts.length; i++) {
  //     const node = document.createElement('script');
  //     node.src = dynamicScripts[i];
  //     node.type = 'text/javascript';
  //     node.async = false;
  //     node.charset = 'utf-8';
  //     document.getElementsByTagName('head')[0].appendChild(node);
  //   }
  // }
}
