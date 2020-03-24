import { PlaceHomeComponent } from './places/place-home/place-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesListComponent } from './places/places-list/places-list.component';
import { PlaceDetailComponent } from './places/place-detail/place-detail.component';


const routes: Routes = [
  { path: '', component: PlaceHomeComponent},
  { path: 'search', component: PlacesListComponent},
  { path: 'detail/:id', component: PlaceDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{scrollPositionRestoration: 'enabled'})], // always top
  exports: [RouterModule]
})
export class AppRoutingModule { }
