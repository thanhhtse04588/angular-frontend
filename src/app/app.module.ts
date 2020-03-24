import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
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
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    PlacesListComponent,
    FooterComponent,
    HeaderComponent,
    PlaceDetailComponent,
    SearchBarComponent,
    PlaceHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
