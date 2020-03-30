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
import { BasicAuthHtppInterceptorService } from './index/service/basic-auth-htpp-interceptor.service';
import { UserOrderComponent } from './user/user-order/user-order.component';
import { PlacePostComponent } from './places/place-post/place-post.component';
// import { GlobalErrorHandler } from './global-error-handler';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { ServerErrorInterceptor } from './server-error.interceptor';

/* Angular material */
import { AngularMaterialModule } from './angular-material.module';
// MDBootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ModalModule, WavesModule, InputsModule, ButtonsModule } from 'angular-bootstrap-md'
import { ErrorPageComponent } from './index/errors/error/error-page/error-page.component';


@NgModule({
  declarations: [
    AppComponent,
    PlacesListComponent,
    FooterComponent,
    HeaderComponent,
    PlaceDetailComponent,
    SearchBarComponent,
    PlaceHomeComponent,
    LogoutComponent,
    UserOrderComponent,
    ErrorPageComponent,
    NotFoundComponent,
    PlacePostComponent,
    LoginComponent,
    RegisterComponent
    
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
    
    ModalModule, WavesModule, InputsModule, ButtonsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true
    },
    // {
    //   provide: ErrorHandler, useClass: GlobalErrorHandler
    // },
    // { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
