
import { SharedModule } from './shared/shared.module';
import { AngularMaterialModule } from './material-module';
import { ContractListComponent } from './admin/contract-list/contract-list.component';
import { UploadTaskComponent } from './places/place-post/upload/upload-task/upload-task.component';
import { DropzoneDirective } from './places/place-post/upload/dropzone.directive';
import { EquipmentComponent } from './places/place-post/equipment/equipment.component';
import { CostLivingComponent } from './places/place-post/cost-living/cost-living.component';
import { RenterContractComponent } from './user/renter-contract/renter-contract.component';
import { RenterOrderComponent } from './user/renter-order/renter-order.component';
import { RenterMenuComponent } from './user/renter-menu/renter-menu.component';
import { PlaceManageComponent } from './admin/place-manage/place-manage.component';
import { UploadComponent } from './places/place-post/upload/upload.component';
import { SellerRentedComponent } from './user/seller-rented/seller-rented.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { CheckingListComponent } from './admin/checking-list/checking-list.component';
import { UserComponent } from './user/user.component';
import { PlacesComponent } from './places/places.component';
import { AdminComponent } from './admin/admin.component';
import { SellerPostEditComponent } from './user/seller-post-edit/seller-post-edit.component';
import { SellerMenuComponent } from './user/seller-menu/seller-menu.component';
import { TestComponent } from './places/test/test.component';
import { NotFoundComponent } from './index/errors/404/not-found/not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlacesListComponent } from './places/places-list/places-list.component';
import { FooterComponent } from './index/footer/footer.component';
import { HeaderComponent } from './index/header/header.component';
import { PlaceDetailComponent } from './places/place-detail/place-detail.component';
import { SearchBarComponent } from './index/search-bar/search-bar.component';
import { PlaceHomeComponent } from './places/place-home/place-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlacePostComponent } from './places/place-post/place-post.component';
import { GlobalErrorHandler } from './error_handler/global-error-handler';
import { ServerErrorInterceptor } from './error_handler/server-error.interceptor';
import { AgmCoreModule } from '@agm/core';
// MDBootstrap
import { ModalModule, CarouselModule } from 'angular-bootstrap-md';

import { ErrorPageComponent } from './index/errors/error/error-page/error-page.component';
import { SellerManageComponent } from './user/seller-manage/seller-manage.component';

// Angular FireBase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { OrderComponent } from './places/place-detail/order/order.component';

import { CostOfLivingBillComponent } from './admin/cost-of-living-bill/cost-of-living-bill.component';
import { RenterColBillComponent } from './user/renter-col-bill/renter-col-bill.component';
import { SellerColBillComponent } from './user/seller-col-bill/seller-col-bill.component';

import { PlaceQuickViewComponent } from './places/place-quick-view/place-quick-view.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { PaymentListComponent } from './admin/payment-list/payment-list.component';
import { RenterPaymentComponent } from './user/renter-payment/renter-payment.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserProfileDialogComponent } from './user/user-profile-dialog/user-profile-dialog.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { LoggerDialogComponent } from './index/logger-dialog/logger-dialog.component';
import { ContractFormComponent } from './admin/order-list/contract-form/contract-form.component';
import { SellerContractComponent } from './user/seller-contract/seller-contract.component';
import { AboutUsComponent } from './index/about-us/about-us.component';


@NgModule({
   declarations: [
      AppComponent,
      PlacesListComponent,
      PlaceDetailComponent,
      FooterComponent,
      HeaderComponent,
      OrderComponent,
      SearchBarComponent,
      PlaceHomeComponent,
      ErrorPageComponent,
      NotFoundComponent,
      PlacePostComponent,
      CostLivingComponent,
      EquipmentComponent,
      UploadComponent,
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
      ContractListComponent,
      OrderListComponent,
      DropzoneDirective,
      UploadTaskComponent,
      CostOfLivingBillComponent,
      RenterColBillComponent,
      SellerColBillComponent,
      PlaceQuickViewComponent,
      PaymentListComponent,
      RenterPaymentComponent,
      UserListComponent,
      UserProfileDialogComponent,
      UserProfileComponent,
      LoggerDialogComponent,
      ContractFormComponent,
      SellerContractComponent,
      AboutUsComponent,
  ],
  entryComponents: [
    ContractFormComponent,
    OrderComponent,
    UserProfileComponent,
    UserProfileDialogComponent,
    LoggerDialogComponent,
  ],
  imports: [
    SharedModule,

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // 3rd parties
    AngularMaterialModule,
    ModalModule.forRoot(),
    CarouselModule,

    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHJYZBS-Vig1M-fizCBelDmmqymJ96tXM',
      libraries: ['places', 'geometry']
  }),
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    {
      provide: ErrorHandler, useClass: GlobalErrorHandler
    },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
