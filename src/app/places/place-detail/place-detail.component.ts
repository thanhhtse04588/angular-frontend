import { PaymentService } from './../service/payment.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from './../../index/service/authentication.service';
import { UserService } from './../../user/service/user.service';
import { Observable, Subscription } from 'rxjs';
import { PlaceDetail, EquipmentListForm } from './../../class/place-detail';
import { PlaceService } from './../service/place.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { formatDate } from "@angular/common";
import { Payment } from 'src/app/class/Payment';
import { ElementRef, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

declare var paypal;


@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  id: number
  place: PlaceDetail

  displayedColumns: string[] = ['name', 'quantity', 'price', 'likeNew', 'equipmentDescrible'];
  dataSource: any
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //payment
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  product = {
    price: 100,
    description: 'Đặt cọc tiền giữ nhà',
    img: ''
  };

  location: Location

  constructor(private route: ActivatedRoute,
    private router: Router,
    private placeService: PlaceService,
    private userService: UserService,
    public loginService: AuthenticationService,
    private paymentService: PaymentService) {
    this.place = new PlaceDetail()
    this.location = {
      latitude: -28.68352,
      longitude: -147.20785,
      zoom: 17,
      marker: {
        lat: -28.68352,
        lng: -147.20785
      }
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.subs.add(this.placeService.getPlaceDetail(this.id)
      .subscribe(data => {
        this.place = data
        this.location = {
          latitude: +this.place.latitude,
          longitude: +this.place.longtitude,
          zoom: 17,
          marker: {
            lat: +this.place.latitude,
            lng: +this.place.longtitude
          }
        }
        this.dataSource = new MatTableDataSource<EquipmentListForm>(this.place.listEquip);
        this.dataSource.paginator = this.paginator;
      }, error => console.log(error)))
  }

  toOrder(id: number){
    this.router.navigate(['places/order', id]);
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