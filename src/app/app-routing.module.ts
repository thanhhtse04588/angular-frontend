import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesListComponent } from './places/places-list/places-list.component';
import { PlaceDetailComponent } from './places/place-detail/place-detail.component';


const routes: Routes = [
  { path: '', component: PlacesListComponent},
  { path: 'detail', component: PlaceDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
