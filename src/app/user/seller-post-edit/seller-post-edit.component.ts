import { PlaceService } from './../../places/service/place.service';
import { UserService } from './../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../index/service/authentication.service';
import { UpdatePostForm, PlacePostForm } from './../../class/place-post-form';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DistrictDB, WardDB, StreetDB } from './../../class/district-db';
import { RoleOfPlace } from './../../class/role-of-place';
import { Router } from '@angular/router';
import { SearchBarService } from 'src/app/index/service/search-bar.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-seller-post-edit',
  templateUrl: './seller-post-edit.component.html',
  styleUrls: ['./seller-post-edit.component.css']
})
export class SellerPostEditComponent implements OnInit, AfterViewInit {
  placeID: number
  roleOfPlaces: Observable<RoleOfPlace>
  districts: Observable<DistrictDB>
  postPlaceForm = new PlacePostForm()
  updatePlaceForm = new UpdatePostForm()
  form: FormGroup
  wards: Observable<WardDB>
  streets: Observable<StreetDB>
  formatPrice: any
  // table edit
  eqmTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  //upload img
  imageUploaded = []
  isDoneUpload = false

  //g map
  gtitle: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  homeDirections = ["Bắc", "Đông Bắc", "Đông", "Đông Nam", "Nam", "Tây Nam", "Tây", "Tây Bắc"]
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private placeService: PlaceService,
    private router: Router,
    private searchService: SearchBarService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public loginService: AuthenticationService, ) { }

  ngOnInit() {
    this.placeID = this.route.snapshot.params['id'];
    this.userService.getPostForm(this.placeID).subscribe(
      data => {
        this.postPlaceForm = data;
        this.setDefaultData();
      }
    )
    // form
    this.roleOfPlaces = this.searchService.getAllRole()
    this.searchService.getAllStatistic().subscribe(
      data => this.districts = data
    )

    this.ngTableOnInit()
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      roleOfPlaceID: new FormControl('', [Validators.required]),
      districtID: new FormControl('', [Validators.required]),
      wardID: new FormControl('', [Validators.required]),
      streetID: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      pricePlace: new FormControl('', [Validators.required]),
      descriptions: new FormControl('', [Validators.required, Validators.minLength(30), Validators.maxLength(3000)]),
      frontispiece: new FormControl(''),
      homeDirection: new FormControl(''),
      numberFloors: new FormControl(''),
      numberBedrooms: new FormControl(''),
      numberToilets: new FormControl(''),
      contactName: new FormControl('', [Validators.required]),
      contactAddress: new FormControl('', Validators.maxLength(100)),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      checkingDate: new FormControl('', [this.date]),
    })
  }

  ngAfterViewInit(): void {
    this.loadPlacesAutoComplete()
  }

  setDefaultData() {
    this.title.setValue(this.postPlaceForm.title)
    this.roleOfPlaceID.setValue(this.postPlaceForm.roleOfPlaceID)
    this.area.setValue(this.postPlaceForm.area)
    this.pricePlace.setValue(this.postPlaceForm.price)
    this.descriptions.setValue(this.postPlaceForm.descriptions)
    this.frontispiece.setValue(this.postPlaceForm.frontispiece)
    this.homeDirection.setValue(this.postPlaceForm.homeDirection)
    this.numberFloors.setValue(this.postPlaceForm.numberFloors)
    this.numberBedrooms.setValue(this.postPlaceForm.numberBedrooms)
    this.numberToilets.setValue(this.postPlaceForm.numberToilets)
    this.searchElementRef.nativeElement.value = this.postPlaceForm.addressDetail
    this.contactName.setValue(this.postPlaceForm.contactName)
    this.contactAddress.setValue(this.postPlaceForm.contactAddress)
    this.phoneNumber.setValue(+this.postPlaceForm.phoneNumber)
    this.email.setValue(this.postPlaceForm.email)
    this.checkingDate.setValue(this.postPlaceForm.checkingDate)
    this.longitude = this.postPlaceForm.longtitude
    this.latitude = this.postPlaceForm.latitude
    // ListEqu handle
    let arr = []
    this.postPlaceForm.listEquip.forEach(element => arr.push(element))
    arr.forEach((element) => element.isEditable = false)
    this.eqmTable.get('tableRows').setValue(arr)
  }

  date(c: AbstractControl): { [key: string]: boolean } {
    let value = new Date(c.value);
    return isNaN(value.getTime()) || value <= new Date() ? { 'invalid': true } : undefined;
  }


  mapReady($event: any) {
    this.zoom = 17
    let placeService = new google.maps.places.PlacesService($event);
    placeService.getDetails({
      placeId: "ChIJbcDqcsCrNTER1efSKj4epwA"
    }, (result, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.longitude = result.geometry.location.lng()
        this.latitude = result.geometry.location.lat()
      }
    });
  }

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

  //load Places Autocomplete
  private loadPlacesAutoComplete() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.setTypes([])
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 17;
        });
      });
    });
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
  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 17;
          this.address = results[0].formatted_address
          this.searchElementRef.nativeElement.value = this.address
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


  //upload img
  uploadHandler(event) {
    if (event !== null) {
      this.imageUploaded = event.imageUploaded
      this.isDoneUpload = event.isDoneUpload
    }
  }


  // table equiment
  ngAfterOnInit() {
    this.control = this.eqmTable.get('tableRows') as FormArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      likeNew: [''],
      equipmentDescrible: ['', [Validators.maxLength(100)]],
      isEditable: [true]
    });
  }


  ngTableOnInit(): void {
    this.touchedRows = [];
    this.eqmTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();
  }

  addRow() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control = this.eqmTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  get getFormControls() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
  }

  toggleTheme() {
    this.mode = !this.mode;
  }

  // main fucntion
  postPlace() {
    this.updatePlaceForm.placeID = this.placeID
    this.updatePlaceForm.title = this.title.value
    this.updatePlaceForm.roleOfPlaceID = this.roleOfPlaceID.value
    this.updatePlaceForm.districtID = this.districtID.value.id
    this.updatePlaceForm.wardID = this.wardID.value.id
    this.updatePlaceForm.streetID = this.streetID.value.id
    this.updatePlaceForm.area = this.area.value
    this.updatePlaceForm.price = this.pricePlace.value
    this.updatePlaceForm.addressDetail = this.searchElementRef.nativeElement.value

    this.updatePlaceForm.latitude = this.latitude
    this.updatePlaceForm.longtitude = this.longitude

    this.updatePlaceForm.descriptions = this.descriptions.value
    this.updatePlaceForm.frontispiece = this.frontispiece.value
    this.updatePlaceForm.homeDirection = this.homeDirection.value
    this.updatePlaceForm.numberFloors = this.numberFloors.value
    this.updatePlaceForm.numberBedrooms = this.numberBedrooms.value
    this.updatePlaceForm.numberToilets = this.numberToilets.value

    this.updatePlaceForm.listEquip = this.eqmTable.get('tableRows').value

    this.updatePlaceForm.listImageLink = this.imageUploaded

    this.updatePlaceForm.contactName = this.contactName.value
    this.updatePlaceForm.contactAddress = this.contactAddress.value
    this.updatePlaceForm.phoneNumber = this.phoneNumber.value.toString()
    this.updatePlaceForm.email = this.email.value
    this.updatePlaceForm.checkingDate = this.checkingDate.value

    this.userService.updatePlace(this.updatePlaceForm).subscribe(
      data => {
        if (data) {
          alert("Chỉnh sửa thông tin thành công !")
        }
        else { alert("Đã có lỗi xảy ra! Chỉnh sửa thông tin không thành công") }
      }
    )
  }

  onDistrictChange() {
    this.wards = null
    this.setwardID([])
    this.streets = null
    this.setStreetID([])
    this.latitude = +this.districtID.value.districtLatitude
    this.longitude = +this.districtID.value.districtLongitude
    this.zoom = 17;
    this.placeService.getWardIDByDistrictID(this.districtID.value.id).subscribe(
      data => {
        this.wards = data
      }
    )
    this.placeService.getStreetIDByDistrictID(this.districtID.value.id).subscribe(
      data => {
        this.streets = data
      }
    )
  }

  onWardChange() {
    this.latitude = +this.wardID.value.wardLatitude
    this.longitude = +this.wardID.value.wardLongtitude
    this.zoom = 17;
  }

  updateAddress() {
    this.searchElementRef.nativeElement.value =
      (this.streetID.value.streetName == null ? "" : this.streetID.value.streetName.trim()) +
      " " + (this.wardID.value.wardName == null ? "" : this.wardID.value.wardName.trim()) +
      " " + (this.districtID.value.district == null ? "" : this.districtID.value.district.trim())
  }

  get title() {
    return this.form.get('title');
  }
  get roleOfPlaceID() {
    return this.form.get('roleOfPlaceID');
  }
  get districtID() {
    return this.form.get('districtID');
  }
  get wardID() {
    return this.form.get('wardID');
  }
  get streetID() {
    return this.form.get('streetID');
  }
  get area() {
    return this.form.get('area');
  }
  get pricePlace() {
    return this.form.get('pricePlace');
  }
  get descriptions() {
    return this.form.get('descriptions');
  }
  get frontispiece() {
    return this.form.get('frontispiece');
  }
  get homeDirection() {
    return this.form.get('homeDirection');
  }
  get numberFloors() {
    return this.form.get('numberFloors');
  }
  get numberBedrooms() {
    return this.form.get('numberBedrooms');
  }
  get numberToilets() {
    return this.form.get('numberToilets');
  }
  get listImageLink() {
    return this.form.get('listImageLink');
  }

  get contactName() {
    return this.form.get('contactName');
  }
  get contactAddress() {
    return this.form.get('contactAddress');
  }
  get phoneNumber() {
    return this.form.get('phoneNumber');
  }
  get email() {
    return this.form.get('email');
  }
  get checkingDate() {
    return this.form.get('checkingDate');
  }
  setwardID(param) {
    this.form.patchValue({ "wardID": param })
  }
  setStreetID(param) {
    this.form.patchValue({ "streetID": param })
  }

}
