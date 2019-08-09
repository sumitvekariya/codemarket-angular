import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/(main:dashboard)',
    pathMatch: 'full'
  },
  {
    path: 'id_token',
    redirectTo: '/(main:dashboard)',
  },
  {
    path: 'access_token',
    redirectTo: '/(main:dashboard)',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule),
    outlet: 'main'
  },
  {
    path: 'sell',
    loadChildren: () => import('./selling/selling.module').then(module => module.SellingModule),
    outlet: 'main'
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then(module => module.HelpModule),
    outlet: 'main'
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(module => module.CartModule),
    outlet: 'main'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
