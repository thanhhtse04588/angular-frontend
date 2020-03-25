import { PlaceHomeComponent } from './places/place-home/place-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesListComponent } from './places/places-list/places-list.component';
import { PlaceDetailComponent } from './places/place-detail/place-detail.component';
import { LoginComponent } from './index/login/login.component';
import { LogoutComponent } from './index/logout/logout.component';
import { RegisterComponent } from './index/register/register.component';
import { AuthGaurdService } from './index/service/auth-gaurd.service';


const routes: Routes = [
  { path: '', component: PlaceHomeComponent},
  { path: 'search', component: PlacesListComponent},
  { path: 'detail/:id', component: PlaceDetailComponent,canActivate:[AuthGaurdService]},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGaurdService] },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{scrollPositionRestoration: 'enabled'})], // always top
  exports: [RouterModule]
})
export class AppRoutingModule { }
