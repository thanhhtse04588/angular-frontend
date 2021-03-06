import { RoleOfPlace, PlacePostForm } from './../../shared/model/place.model';
import { DistrictDB, WardDB, StreetDB } from './../../shared/model/local.model';
import { SharedService } from '../../shared/service/shared.service';
import { AuthGaurdService } from './../../index/service/auth-gaurd.service';
import { UserService } from './../../user/service/user.service';
import { EquipmentComponent } from './equipment/equipment.component';
import { CostLivingComponent } from './cost-living/cost-living.component';
import { Common } from '../../shared/common';
import { AuthenticationService } from './../../index/service/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlaceService } from './../service/place.service';
import { SearchBarService } from 'src/app/index/service/search-bar.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone, OnDestroy, Input, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { thanToday } from 'src/app/shared/directive/than-today.directive';

@Component({
  selector: 'app-place-post',
  templateUrl: './place-post.component.html',
  styles: ['mat-form-field { width: 100%;}']
})
export class PlacePostComponent implements OnInit, OnDestroy, AfterViewChecked {
  private subs = new Subscription();
  @Input() placeEditID: number;
  isSubmit = false;
  roleOfPlaces: RoleOfPlace[];
  postPlaceForm = new PlacePostForm();
  form: FormGroup;
  districts: DistrictDB[];
  wards: WardDB[];
  streets: StreetDB[];
  formatPrice: any;
  redirect= 'user/seller/post-manage';
  // Equipment
  @ViewChild(EquipmentComponent)
  equipComponent: EquipmentComponent;
  // cost of living
  @ViewChild(CostLivingComponent)
  costComponent: CostLivingComponent;
  // upload img
  imageUploaded: string[] = [];
  // g map
  @ViewChild('search')
  public searchElementRef: ElementRef;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  homeDirections = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];
  constructor(
    private placeService: PlaceService,
    private userService: UserService,
    private router: Router,
    private searchService: SearchBarService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public loginService: AuthenticationService,
    public authGaurdService: AuthGaurdService,
    public sharedService: SharedService,
    private cdr: ChangeDetectorRef) { 
      
    }

  defaultToEdit(data: PlacePostForm) {
    this.form.patchValue(data);
    this.equipComponent.setToEdit(data.listEquip);
    this.costComponent.setToEdit(data.listCost);
    this.imageUploaded = data.listImageLink;
    this.searchElementRef.nativeElement.value = data.addressDetail;
    this.longitude = +data.longtitude;
    this.latitude = +data.latitude;
  }
  ngOnInit() {
    this.latitude = 21.0255349; // load default map
    this.longitude = 105.8521337;
    this.zoom = Common.ZOOM;
    this.loadPlacesAutoComplete();

    this.subs.add(this.searchService.getAllRole().subscribe(
      data => this.roleOfPlaces = data as RoleOfPlace[]
    ));
    this.subs.add(this.searchService.getAllStatistic().subscribe(
      data => this.districts = data as DistrictDB[]
    ));

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      roleOfPlaceID: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      ward: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required, Validators.min(0)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      descriptions: new FormControl('', [Validators.required, Validators.minLength(30), Validators.maxLength(3000)]),
      frontispiece: new FormControl('', [Validators.min(0)]),
      homeDirection: new FormControl('', [Validators.min(0)]),
      numberFloors: new FormControl('', [Validators.min(0)]),
      numberBedrooms: new FormControl('', [Validators.min(0)]),
      numberToilets: new FormControl('', [Validators.min(0)]),
      contactName: new FormControl('', [Validators.required, Validators.maxLength(32)]),
      contactAddress: new FormControl('', Validators.maxLength(100)),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('((\\+91-?)|0)?[0-9]*')]),
      email: new FormControl('', [Validators.email,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      Validators.required]),
      checkingDate: new FormControl('', [Validators.required, thanToday()]),
    });

  }
  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
  // load Places Autocomplete
  private loadPlacesAutoComplete() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.setTypes([]);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        });
      });
    });
  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          this.searchElementRef.nativeElement.value = this.address;
        } else {
          this.sharedService.loggerDialog(false, 'Không tìm thấy kết quả');
        }
      } else {
        this.sharedService.loggerDialog(false);
      }

    });
  }

  // upload img
  uploadHandler(event) {
    this.imageUploaded.push(event);
  }

  // main fucntion
  onSubmit(form) {
    this.isSubmit = true;
    this.placeEditID ? this.editPlace(form) : this.postPlace(form);
  }
  postPlace(form) {
    form.districtID = form.district.id;
    form.streetID = form.street.id;
    form.wardID = form.ward.id;
    this.postPlaceForm = form;

    this.postPlaceForm.userID = this.loginService.currentUserValue.userID;
    this.postPlaceForm.addressDetail = this.searchElementRef.nativeElement.value;
    this.postPlaceForm.latitude = this.latitude;
    this.postPlaceForm.longtitude = this.longitude;
    this.postPlaceForm.listEquip = this.equipComponent.getEquipTable();
    this.postPlaceForm.listCost = this.costComponent.getCostOfLivingTable();
    this.postPlaceForm.listImageLink = this.imageUploaded;
    this.placeService.insertPlace(this.postPlaceForm).subscribe(
      data => data ? this.sharedService.loggerDialog(true, 'Yêu cầu đăng tin thành công, chúng tôi sẽ sớm liên hệ với bạn !',this.redirect)
        : this.sharedService.loggerDialog(false,null,this.redirect),
      (err) => this.sharedService.loggerDialog(false,null,this.redirect)
    );
  }

  editPlace(form) {
    form.districtID = form.district.id;
    form.streetID = form.street.id;
    form.wardID = form.ward.id;
    form.placeID = this.placeEditID;
    form.userID = this.loginService.currentUserValue.userID;
    form.addressDetail = this.searchElementRef.nativeElement.value;
    form.latitude = this.latitude;
    form.longtitude = this.longitude;
    form.listEquip = this.equipComponent.getEquipTable();
    form.listCost = this.costComponent.getCostOfLivingTable();
    form.listImageLink = this.imageUploaded;

    this.userService.updatePlace(form).subscribe(
      data => data ? this.sharedService.loggerDialog(true,null,this.redirect) : this.sharedService.loggerDialog(false,null,this.redirect),
      (err) => this.sharedService.loggerDialog(false,null,this.redirect)
    );
  }

  onDistrictChange() {
    this.updateAddress();
    this.wards = null;
    this.setward([]);
    this.streets = null;
    this.setStreet([]);
    this.latitude = +this.district.value.districtLatitude;
    this.longitude = +this.district.value.districtLongitude;

    this.placeService.getWardIDByDistrictID(this.district.value.id).subscribe(
      data => this.wards = data as WardDB[]);
    this.placeService.getStreetIDByDistrictID(this.district.value.id).subscribe(
      data => this.streets = data as StreetDB[]);
  }

  onWardChange() {
    this.latitude = +this.ward.value.wardLatitude;
    this.longitude = +this.ward.value.wardLongtitude;
    this.updateAddress();
  }

  updateAddress() {
    this.searchElementRef.nativeElement.value =
      `${this.street.value.streetName?.trim() || ''} ${this.ward.value.wardName?.trim() || ''},${this.district.value.district?.trim() || ''}`;
  }

  isStepOneValid() {
    return this.title.valid && this.roleOfPlaceID.valid &&
      this.district.valid && this.ward.valid && this.street.valid
      && this.area.valid && this.price.valid;
  }
  isStepTwoValid() { return this.descriptions.valid; }
  isStepThreeValid() { return true; }
  isStepFourValid() { return this.equipComponent?.eqmTable?.valid; }
  isStepFiveValid() { return this.costComponent?.eqmTable?.valid; }
  isStepSixValid() { return this.imageUploaded.length !== 0; }
  isStepSevenValid() { return this.searchElementRef?.nativeElement?.value || false; }
  isStepEightValid() { return this.contactName.valid && this.phoneNumber.valid && this.checkingDate.valid }

  get title() { return this.form.get('title'); }

  get roleOfPlaceID() { return this.form.get('roleOfPlaceID'); }

  get district() { return this.form.get('district'); }

  get ward() { return this.form.get('ward'); }

  get street() { return this.form.get('street'); }

  get area() { return this.form.get('area'); }

  get price() { return this.form.get('price'); }

  get descriptions() { return this.form.get('descriptions'); }

  get frontispiece() { return this.form.get('frontispiece'); }

  get homeDirection() { return this.form.get('homeDirection'); }

  get numberFloors() { return this.form.get('numberFloors'); }

  get numberBedrooms() { return this.form.get('numberBedrooms'); }

  get numberToilets() { return this.form.get('numberToilets'); }

  get listImageLink() { return this.form.get('listImageLink'); }

  get contactName() { return this.form.get('contactName'); }

  get contactAddress() { return this.form.get('contactAddress'); }

  get phoneNumber() { return this.form.get('phoneNumber'); }

  get email() { return this.form.get('email'); }

  get checkingDate() { return this.form.get('checkingDate'); }

  setward(param) { this.form.patchValue({ ward: param }); }

  setStreet(param) { this.form.patchValue({ street: param }); }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // Get Current Location Coordinates
  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 17;
  //     });
  //   }
  // }

  // mapReady($event: any) {
  // this.zoom = Common.ZOOM
  // let placeService = new google.maps.places.PlacesService($event);
  // placeService.getDetails({
  //   placeId: 'ChIJbcDqcsCrNTER1efSKj4epwA'
  // }, (result, status) => {
  //   if (status == google.maps.places.PlacesServiceStatus.OK) {
  //     this.longitude = result.geometry.location.lng()
  //     this.latitude = result.geometry.location.lat()
  //   }
  // });
  // }

  // autoLoadMapWithSelect(keyword) {
  //   this.mapsAPILoader.load().then(() => {
  //     let service = new google.maps.places.AutocompleteService();
  //     service.getQueryPredictions({ input: keyword }, (predictions, status) => {
  //       if (status == google.maps.places.PlacesServiceStatus.OK) {
  //         var result = predictions[0].place_id
  //       }
  //     });
  //   });
  // }
}
