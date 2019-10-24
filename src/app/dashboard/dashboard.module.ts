import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '../shared/shared.module';
import { CompaniesListComponent } from '../companies/companies-list/companies-list.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full'
  },

  {
    path: 'post-list',
    loadChildren: () => import('../post/posts-list/posts-list.module').then(module => module.PostsListModule)
  },
  {
    path: 'company-list',
    component: CompaniesListComponent,
    data: { noReuse: true }
  },
  {
    path: 'bugfixes-all',
    loadChildren: () => import('../selling/products-list/products-list.module').then(module => module.ProductsListModule),
  },
  // {
  //   path: 'help-requests-all',
  //   loadChildren: () => import('../help/help-request-list/help-request-list.module').then(module => module.HelpRequestListModule),
  // },

  // Profile of LoggedIn User
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then(module => module.MyProfileModule),
  },

  // Profile of Other User
  {
    path: 'profile/:authorId',
    loadChildren: () => import('./my-profile/my-profile.module').then(module => module.MyProfileModule),
  },
  {
    path: 'product-details/:productId',
    loadChildren: () => import('./product-details/product-details.module').then(module => module.ProductDetailsModule),
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'help-request-details/:helpRequestId',
    loadChildren: () => import('../detail/detail.module').then(module => module.DetailModule),
  },
  {
    path: 'interview-details/:interviewId',
    loadChildren: () => import('../detail/detail.module').then(module => module.DetailModule),
  },
  {
    path: 'requirement-details/:requirementId',
    loadChildren: () => import('../detail/detail.module').then(module => module.DetailModule),
  },
  {
    path: 'testing-details/:testingId',
    loadChildren: () => import('../detail/detail.module').then(module => module.DetailModule),
  },
  {
    path: 'howtodoc-details/:howtodocId',
    loadChildren: () => import('../detail/detail.module').then(module => module.DetailModule),
  },
  {
    path: 'design-details/:designId',
    loadChildren: () => import('../detail/detail.module').then(module => module.DetailModule),
  },
  {
    path: 'goal-details/:goalId',
    loadChildren: () => import('../detail/detail.module').then(module => module.DetailModule),
  },
  {
    path: 'event-details/:eventId',
    loadChildren: () => import('../detail/detail.module').then(module => module.DetailModule),
  },
  {
    path: 'team-skill-details/:teamSkillId',
    loadChildren: () => import('../detail/detail.module').then(module => module.DetailModule),
  },
];



@NgModule({
  declarations: [DashboardComponent, ProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    // CompaniesModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
