
import { AuthenticationService } from './../../index/service/authentication.service';
import { PlacePostForm } from './../../class/place-post-form';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DistrictDB, WardDB, StreetDB } from './../../class/district-db';
import { RoleOfPlace } from './../../class/role-of-place';
import { Router } from '@angular/router';
import { PlaceService } from './../service/place.service';
import { SearchBarService } from 'src/app/index/service/search-bar.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-place-post',
  templateUrl: './place-post.component.html',
  styleUrls: ['./place-post.component.css']
})
export class PlacePostComponent implements OnInit, AfterViewInit {
  roleOfPlaces: Observable<RoleOfPlace>
  districts: Observable<DistrictDB>
  postPlaceForm: PlacePostForm
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
  uploadTitle = 'File-Upload-Save';
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;

  //g map
  gtitle: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  homeDirections = ["Bắc", "Đông Bắc", "Đông", "Đông Nam", "Nam", "Tây Nam", "Tây", "Tây Bắc"]

  constructor(private fb: FormBuilder,
    private placeService: PlaceService,
    private router: Router,
    private searchService: SearchBarService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public loginService: AuthenticationService) { }

  ngOnInit(): void {

    this.postPlaceForm = new PlacePostForm()
    this.roleOfPlaces = this.searchService.getAllRole()
    this.districts = this.searchService.getAllStatistic()

    this.ngTableOnInit()
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      roleOfPlaceID: new FormControl([Validators.required]),
      districtID: new FormControl([Validators.required]),
      wardID: new FormControl([Validators.required]),
      streetID: new FormControl([Validators.required]),
      area: new FormControl('', [Validators.required,Validators.maxLength(15)]),
      price: new FormControl('', [Validators.required,Validators.maxLength(15)]),
      addressDetail: new FormControl('', [Validators.required,Validators.maxLength(100)]),
      descriptions: new FormControl('', [Validators.minLength(30), Validators.maxLength(3000)]),
      frontispiece: new FormControl('',[Validators.maxLength(15)]),
      homeDirection: new FormControl(''),
      numberFloors: new FormControl('',[Validators.maxLength(15)]),
      numberBedrooms: new FormControl('',[Validators.maxLength(15)]),
      numberToilets: new FormControl('',[Validators.maxLength(15)]),
      listImageLink: new FormControl(''),
      contactName: new FormControl('', [Validators.required]),
      contactAddress: new FormControl('',Validators.maxLength(100)),
      phoneNumber: new FormControl('', [Validators.required,Validators.maxLength(15)]),
      email: new FormControl('', [Validators.email]),
      checkingDate: new FormControl('',[this.date]),
    })
  }

  date(c: AbstractControl): { [key: string]: boolean } {
    let value = new Date(c.value);
    return isNaN(value.getTime()) || value <= new Date() ? {'invalid': true} : undefined;
 }

  ngAfterViewInit(): void {
    this.loadPlacesAutoComplete()
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
        console.log(this.longitude + this.latitude)
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

  // upload img
  change($event) {
    this.changeImage = true;
  }
  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }
  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.placeService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        alert('File Successfully Uploaded');
      }
      this.selectedFiles = undefined;
    }
    );
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      var size = event.target.files[0].size;
      if (size > 4000000) {
        alert("Tệp ảnh không quá 4 MB");
        this.form.get('listImageLink').setValue("");
      }
      else {
        this.selectedFiles = event.target.files;
      }
    } else {
      alert('Tệp phải là định dạng hình ảnh');
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
    console.log(this.touchedRows);
  }

  toggleTheme() {
    this.mode = !this.mode;
  }

  // main fucntion
  postPlace() {
    this.postPlaceForm.userID = +sessionStorage.getItem("userID")
    this.postPlaceForm.title = this.title.value
    this.postPlaceForm.roleOfPlaceID = this.roleOfPlaceID.value
    this.postPlaceForm.districtID = this.districtID.value.id
    this.postPlaceForm.wardID = this.wardID.value.id
    this.postPlaceForm.streetID = this.streetID.value.id
    this.postPlaceForm.area = this.area.value
    this.postPlaceForm.price = this.price.value
    this.postPlaceForm.addressDetail = this.addressDetail.value

    this.postPlaceForm.latitude = this.latitude
    this.postPlaceForm.longtitude = this.longitude

    this.postPlaceForm.descriptions = this.descriptions.value
    this.postPlaceForm.frontispiece = this.frontispiece.value
    this.postPlaceForm.homeDirection = this.homeDirection.value
    this.postPlaceForm.numberFloors = this.numberFloors.value
    this.postPlaceForm.numberBedrooms = this.numberBedrooms.value
    this.postPlaceForm.numberToilets = this.numberToilets.value

    this.postPlaceForm.listEquip = this.eqmTable.get('tableRows').value

    this.postPlaceForm.listImageLink = ["../../assets/img/khong-gian-phong-khach-royal-city.jpg", "../../assets/img/khong-gian-phong-khach-royal-city.jpg"]
    // this.postPlaceForm.listImageLink = this.listImageLink.value
    this.postPlaceForm.contactName = this.contactName.value
    this.postPlaceForm.contactAddress = this.contactAddress.value
    this.postPlaceForm.phoneNumber = this.phoneNumber.value.toString()
    this.postPlaceForm.email = this.email.value
    this.postPlaceForm.checkingDate = this.checkingDate.value
    this.placeService.insertPlace(this.postPlaceForm).subscribe(
      data => {
        console.log(data)
        if (data) {
          this.router.navigate(["home"])
          alert("Yêu cầu đăng tin thành công, chúng tôi sẽ sớm liên hệ với bạn !")
        }
        else { alert("Đã có lỗi xảy ra! Yêu cầu đăng tin không thành công") }
      }
    )
  }

  onDistrictChange() {
    this.wards = null
    this.setwardID(null)
    this.streets = null
    this.setStreetID(null)
    this.searchElementRef.nativeElement.value = this.districtID.value.district + ",Hà Nội" + ",Việt Nam"
    this.placeService.getWardIDByDistrictID(this.districtID.value.id).subscribe(
      data => {
        this.wards = data
      }
    )
  }

  onWardChange() {
    this.streets = null
    this.setStreetID(null)
    this.searchElementRef.nativeElement.value = this.wardID.value.wardName + "," + this.districtID.value.district + ",Hà Nội" + ",Việt Nam"
    this.placeService.getStreetIDByWardID(this.wardID.value.id).subscribe(
      data => {
        this.streets = data
      }
    )

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
  get price() {
    return this.form.get('price');
  }
  get addressDetail() {
    return this.form.get('addressDetail');
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
