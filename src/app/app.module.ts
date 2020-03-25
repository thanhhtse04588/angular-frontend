import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { ReactiveFormsModule,FormsModule  } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlacesListComponent } from './places/places-list/places-list.component';
import { FooterComponent } from './index/footer/footer.component';
import { HeaderComponent } from './index/header/header.component';
import { PlaceDetailComponent } from './places/place-detail/place-detail.component';
import { SearchBarComponent } from './index/search-bar/search-bar.component';
import { PlaceHomeComponent } from './places/place-home/place-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './index/login/login.component';
import { LogoutComponent } from './index/logout/logout.component';
import { RegisterComponent } from './index/register/register.component';
import { BasicAuthHtppInterceptorService } from './index/service/basic-auth-htpp-interceptor.service';

/* Angular material */
// import { AngularMaterialModule } from './angular-material.module';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [
    AppComponent,
    PlacesListComponent,
    FooterComponent,
    HeaderComponent,
    PlaceDetailComponent,
    SearchBarComponent,
    PlaceHomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,

    // AngularMaterialModule,
    // MDBBootstrapModule.forRoot()
  ],
  providers: [
    {  
      provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true 
    }
    ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
