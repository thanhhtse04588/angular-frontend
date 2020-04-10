import { AdminComponent } from './admin/admin.component';
import { SellerPostEditComponent } from './user/seller-post-edit/seller-post-edit.component';
import { TestComponent } from './places/test/test.component';
import { RegisterComponent } from './index/register/register.component';
import { LoginComponent } from './index/login/login.component';
import { PlaceHomeComponent } from './places/place-home/place-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceDetailComponent } from './places/place-detail/place-detail.component';
import { LogoutComponent } from './index/logout/logout.component';
import { AuthGaurdService } from './index/service/auth-gaurd.service';
import { ErrorPageComponent } from './index/errors/error/error-page/error-page.component';
import { NotFoundComponent } from './index/errors/404/not-found/not-found.component';
import { PlacePostComponent } from './places/place-post/place-post.component';
import { SellerManageComponent } from './user/seller-manage/seller-manage.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PlaceHomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detail/:id', component: PlaceDetailComponent, },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService] },
  { path: 'error', component: ErrorPageComponent },
  {
    path: 'seller',
    children: [
      { path: '', redirectTo: 'post-manage', pathMatch: 'full' },
      { path: 'post', component: PlacePostComponent },
      { path: 'post-manage', component: SellerManageComponent, canActivate: [AuthGaurdService] },
      { path: 'post-edit', component: SellerPostEditComponent, canActivate: [AuthGaurdService] }
    ]
  },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGaurdService]},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })], // always top
  exports: [RouterModule]
})
export class AppRoutingModule { }
