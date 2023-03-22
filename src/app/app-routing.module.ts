import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './home/notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './order/cart/cart.component';
import { CheckoutComponent } from './order/checkout/checkout.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products/:id', component: ProductDetailComponent},  
  {path: 'products', component: ProductListComponent},

  {path: 'cart', component: CartComponent, canActivate: [MsalGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [MsalGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NotfoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation:'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {


  constructor(public translate: TranslateService) {
    
  }

 }
