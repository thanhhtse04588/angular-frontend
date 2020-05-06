import { OrderComponent } from './order/order.component';
import { SharedService } from '../../shared/service/shared.service';
import { PlaceDetail, EquipmentListForm, CostOfPlaceForm, CostUnitName } from './../../shared/model/place.model';
import { AuthGaurdService } from './../../index/service/auth-gaurd.service';
import { PlaceStatus, Common } from '../../shared/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from './../../index/service/authentication.service';
import { PlaceService } from './../service/place.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
  id: number;
  place: PlaceDetail;
  orderCount: number;
  units: CostUnitName[];
  // Equip table
  displayedColumns: string[] = ['name', 'quantity', 'price', 'likeNew', 'equipmentDescrible'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // Cost Of Living Table
  costColumns: string[] = ['costName', 'costPrice', 'unitID'];
  dataCost: any;
  @ViewChild(MatPaginator, { static: true }) paginatorCostTable: MatPaginator;
  location: Location;

  constructor(
    public dialog: MatDialog,
    private placeService: PlaceService,
    public loginService: AuthenticationService,
    public authGaurdService: AuthGaurdService,
    public sharedService: SharedService) {
  }

  getOrderCount() {
    this.placeService.getCountOrderPendingByPlaceID(this.place.placeID).subscribe(
      data => this.orderCount = data
    );
  }

  ngOnInit() {
    this.location = {
      latitude: -28.68352,
      longitude: -147.20785,
      zoom: Common.ZOOM.valueOf(),
      marker: {
        lat: -28.68352,
        lng: -147.20785
      }
    };
    this.placeService.getCostUnit().subscribe(
      data => this.units = data as CostUnitName[]
    );

    this.getData();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(OrderComponent, {
      width: '620px',
      data: this.place.placeID,
      disableClose: true
    });
  }
  getData() {
    this.placeService.getPlaceDetail(+sessionStorage.getItem('placeID'))
      .subscribe(data => {
        this.place = data;
        this.getOrderCount();
        this.location = {
          latitude: +this.place.latitude,
          longitude: +this.place.longtitude,
          zoom: Common.ZOOM.valueOf(),
          marker: {
            lat: +this.place.latitude,
            lng: +this.place.longtitude
          }
        };
        this.dataSource = new MatTableDataSource<EquipmentListForm>(this.place.listEquip);
        this.dataSource.paginator = this.paginator;

        this.dataCost = new MatTableDataSource<CostOfPlaceForm>(this.place.listCost);
        this.dataCost.paginator = this.paginatorCostTable;
      });
  }
  getUnitName(id: number) {
    return this.units?.find(unit => unit.id === id).unitName;
  }

  isActive(id: number) {
    return id === PlaceStatus.ACTIVE;
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
