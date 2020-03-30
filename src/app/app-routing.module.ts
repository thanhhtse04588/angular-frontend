import { RegisterComponent } from './index/register/register.component';
import { LoginComponent } from './index/login/login.component';
import { PlaceHomeComponent } from './places/place-home/place-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesListComponent } from './places/places-list/places-list.component';
import { PlaceDetailComponent } from './places/place-detail/place-detail.component';
import { LogoutComponent } from './index/logout/logout.component';
import { AuthGaurdService } from './index/service/auth-gaurd.service';
import { ErrorPageComponent } from './index/errors/error/error-page/error-page.component';
import { NotFoundComponent } from './index/errors/404/not-found/not-found.component';
import { PlacePostComponent } from './places/place-post/place-post.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: PlaceHomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'search', component: PlacesListComponent},
  { path: 'detail/:id', component: PlaceDetailComponent,},
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGaurdService] },
  { path: 'error', component: ErrorPageComponent},
  { path: 'post', component: PlacePostComponent},
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{scrollPositionRestoration: 'enabled'})], // always top
  exports: [RouterModule]
})
export class AppRoutingModule { }
