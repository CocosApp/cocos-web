import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscountsManagementComponent } from './discounts-management.component';

const routes: Routes = [
  {
    path: '',
    component: DiscountsManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountsManagementRoutingModule { }
