import { EquipmentComponent } from './places/place-post/equipment/equipment.component';
import { CostLivingComponent } from './places/place-post/cost-living/cost-living.component';
import { PaypalButtonComponent } from './shared/paypal-button/paypal-button.component';
import { RenterContractComponent } from './user/renter-contract/renter-contract.component';
import { RenterOrderComponent } from './user/renter-order/renter-order.component';
import { RenterMenuComponent } from './user/renter-menu/renter-menu.component';
import { PlaceManageComponent } from './admin/place-manage/place-manage.component';

import { UploadComponent } from './places/place-post/upload/upload.component';
import { SellerRentedComponent } from './user/seller-rented/seller-rented.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CheckingListComponent } from './admin/checking-list/checking-list.component';

import { UserComponent } from './user/user.component';
import { PlacesComponent } from './places/places.component';
import { AdminComponent } from './admin/admin.component';
import { SellerPostEditComponent } from './user/seller-post-edit/seller-post-edit.component';
import { SellerMenuComponent } from './user/seller-menu/seller-menu.component';
import { TestComponent } from './places/test/test.component';
import { RegisterComponent } from './index/register/register.component';
import { LoginComponent } from './index/login/login.component';
import { NotFoundComponent } from './index/errors/404/not-found/not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlacesListComponent } from './places/places-list/places-list.component';
import { FooterComponent } from './index/footer/footer.component';
import { HeaderComponent } from './index/header/header.component';
import { PlaceDetailComponent } from './places/place-detail/place-detail.component';
import { SearchBarComponent } from './index/search-bar/search-bar.component';
import { PlaceHomeComponent } from './places/place-home/place-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoutComponent } from './index/logout/logout.component';
// import { BasicAuthHtppInterceptorService } from './index/service/basic-auth-htpp-interceptor.service';
import { PlacePostComponent } from './places/place-post/place-post.component';
import { GlobalErrorHandler } from './global-error-handler';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ServerErrorInterceptor } from './server-error.interceptor';
import { AgmCoreModule } from '@agm/core';

/* Angular material */
import { AngularMaterialModule } from './angular-material.module';
// MDBootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ErrorPageComponent } from './index/errors/error/error-page/error-page.component';
import { SellerManageComponent } from './user/seller-manage/seller-manage.component';

// Angular FireBase
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { OrderComponent } from './places/place-detail/order/order.component';



@NgModule({
   declarations: [
      AppComponent,
      PlacesListComponent,
      FooterComponent,
      HeaderComponent,
      PlaceDetailComponent,
      OrderComponent,
      SearchBarComponent,
      PlaceHomeComponent,
      LogoutComponent,
      ErrorPageComponent,
      NotFoundComponent,
      PlacePostComponent,
      CostLivingComponent,
      EquipmentComponent,
      UploadComponent,
      LoginComponent,
      RegisterComponent,
      TestComponent,
      SellerMenuComponent,
      SellerManageComponent,
      SellerPostEditComponent,
      SellerRentedComponent,
      RenterMenuComponent,
      RenterOrderComponent,
      RenterContractComponent,
      PlacesComponent,
      UserComponent,
      AdminComponent,
      PlaceManageComponent,
      CheckingListComponent,
      DashboardComponent,
      OrderListComponent,
      PaypalButtonComponent
      

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,

    AngularMaterialModule,
    MDBBootstrapModule.forRoot(),

    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHJYZBS-Vig1M-fizCBelDmmqymJ96tXM',
      libraries: ["places", "geometry"]
  })
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true
    // },
    {
      provide: ErrorHandler, useClass: GlobalErrorHandler
    },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
