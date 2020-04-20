import { PlaceStatus, Common } from './../../class/common';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from './../../index/service/authentication.service';
import { Subscription } from 'rxjs';
import { PlaceDetail, EquipmentListForm, CostOfPlaceForm, CostUnitName } from './../../class/place-detail';
import { PlaceService } from './../service/place.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  id: number;
  place: PlaceDetail;
  orderCount: number;
  units: CostUnitName[];
  // Equip table
  displayedColumns: string[] = ['name', 'quantity', 'price', 'likeNew', 'equipmentDescrible'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
// Cost Of Living Table
  costColumns: string[] = ['costName', 'costPrice','unitID'];
  dataCost: any;
  @ViewChild(MatPaginator, { static: true }) paginatorCostTable: MatPaginator;
  location: Location;

  constructor(private route: ActivatedRoute,
    private placeService: PlaceService,
    public loginService: AuthenticationService) {
    this.place = new PlaceDetail()
  }

  getOrderCount() {
    this.subs.add(this.placeService.getCountOrderPendingByPlaceID(this.place.placeID).subscribe(
      data => this.orderCount = data
    ))
  }

  ngOnInit() {
    this.location = {
      latitude: -28.68352,
      longitude: -147.20785,
      zoom: Common.ZOOM,
      marker: {
        lat: -28.68352,
        lng: -147.20785
      }
    }
    this.subs.add(this.placeService.getCostUnit().subscribe(
      data => this.units = data as CostUnitName[]
    ))
    this.getData()
  }

  getData() {
    this.subs.add(this.placeService.getPlaceDetail(+sessionStorage.getItem("placeID"))
      .subscribe(data => {
        this.place = data;
        this.getOrderCount();
        this.location = {
          latitude: +this.place.latitude,
          longitude: +this.place.longtitude,
          zoom: Common.ZOOM,
          marker: {
            lat: +this.place.latitude,
            lng: +this.place.longtitude
          }
        }
        this.dataSource = new MatTableDataSource<EquipmentListForm>(this.place.listEquip);
        this.dataSource.paginator = this.paginator;

        this.dataCost = new MatTableDataSource<CostOfPlaceForm>(this.place.listCost);
        this.dataCost.paginator = this.paginatorCostTable;
      }))
  }

  getUnitName(id: number){
    return this.units?.find(unit => unit.id ===id).unitName;
  }

  isActive(id: number) {
    return id == PlaceStatus.ACTIVE;
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

interface Marker {
  lat: number;
  lng: number;
}
interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
  marker: Marker;
}