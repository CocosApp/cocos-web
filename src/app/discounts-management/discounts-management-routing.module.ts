import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscountsManagementComponent } from './discounts-management.component';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { DiscountDetailsComponent } from './discount-details/discount-details.component';
import { InstanceResolverForDiscount } from '../shared/resolvers/instance.resolver';

const routes: Routes = [
  {
    path: '',
    component: DiscountsManagementComponent,
    children: [
      {
        path: '',
        component: DiscountListComponent
      },
      {
        path: 'agregar',
        component: DiscountDetailsComponent,
      },
      {
        path: ':id',
        component: DiscountDetailsComponent,
        resolve: {
          discount: InstanceResolverForDiscount
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountsManagementRoutingModule { }
