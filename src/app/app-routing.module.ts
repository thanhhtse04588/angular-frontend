import { SellerColBillComponent } from './user/seller-col-bill/seller-col-bill.component';
import { RenterColBillComponent } from './user/renter-col-bill/renter-col-bill.component';
import { CostOfLivingBillComponent } from './admin/cost-of-living-bill/cost-of-living-bill.component';
import { ContractListComponent } from './admin/contract-list/contract-list.component';
import { RenterContractComponent } from './user/renter-contract/renter-contract.component';
import { RenterOrderComponent } from './user/renter-order/renter-order.component';
import { PlaceManageComponent } from './admin/place-manage/place-manage.component';
import { SellerRentedComponent } from './user/seller-rented/seller-rented.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { CheckingListComponent } from './admin/checking-list/checking-list.component';
import { UserComponent } from './user/user.component';
import { PlacesComponent } from './places/places.component';
import { AdminComponent } from './admin/admin.component';
import { SellerPostEditComponent } from './user/seller-post-edit/seller-post-edit.component';
import { TestComponent } from './places/test/test.component';
import { PlaceHomeComponent } from './places/place-home/place-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceDetailComponent } from './places/place-detail/place-detail.component';

import { AuthGaurdService } from './index/service/auth-gaurd.service';
import { AuthAdminService } from './index/service/auth-admin.service';
import { ErrorPageComponent } from './index/errors/error/error-page/error-page.component';
import { NotFoundComponent } from './index/errors/404/not-found/not-found.component';
import { PlacePostComponent } from './places/place-post/place-post.component';
import { SellerManageComponent } from './user/seller-manage/seller-manage.component';
import { OrderComponent } from './places/place-detail/order/order.component';


const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  {
    path: 'places', component: PlacesComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: PlaceHomeComponent },
      { path: 'detail', component: PlaceDetailComponent },
      { path: 'order', component: OrderComponent, canActivate: [AuthGaurdService] },
    ]
  },
  {
    path: 'user', component: UserComponent, children: [
      { path: '', redirectTo: 'seller', pathMatch: 'full' },
      { path: 'test', component: TestComponent },
      { path: 'error', component: ErrorPageComponent },
      {
        path: 'seller',
        children: [
          { path: '', redirectTo: 'post-manage', pathMatch: 'full' },
          { path: 'post', component: PlacePostComponent },
          { path: 'post-manage', component: SellerManageComponent, canActivate: [AuthGaurdService] },
          { path: 'post-edit', component: SellerPostEditComponent, canActivate: [AuthGaurdService] },
          { path: 'rented', component: SellerRentedComponent, canActivate: [AuthGaurdService] },
          { path: 'bill', component: SellerColBillComponent, canActivate: [AuthGaurdService] },
        ]
      },
      {
        path: 'renter',
        children: [
          { path: '', redirectTo: 'order', pathMatch: 'full' },
          { path: 'order', component: RenterOrderComponent, canActivate: [AuthGaurdService] },
          { path: 'contract', component: RenterContractComponent, canActivate: [AuthGaurdService] },
          { path: 'bill', component: RenterColBillComponent, canActivate: [AuthGaurdService] },
        ]
      }
    ]
  },


  {
    path: 'admin', component: AdminComponent, canActivate: [AuthAdminService],
    children: [
      {path: '', redirectTo: 'checking-list', pathMatch: 'full'},
      { path: 'checking-list', component: CheckingListComponent, canActivate: [AuthAdminService] },
      { path: 'order-list', component: OrderListComponent, canActivate: [AuthAdminService] },
      { path: 'place-manage', component: PlaceManageComponent, canActivate: [AuthAdminService] },
      { path: 'contract-list', component: ContractListComponent, canActivate: [AuthAdminService] },
      { path: 'cost-of-living-bill', component: CostOfLivingBillComponent, canActivate: [AuthAdminService] },
    ]
  },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })], // always top
  exports: [RouterModule]
})
export class AppRoutingModule { }
