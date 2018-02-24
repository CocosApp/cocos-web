import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'sucursales',
        loadChildren: 'app/branches-management/branches-management.module#BranchesManagementModule',
      },
      {
        path: 'descuentos',
        loadChildren: 'app/discounts-management/discounts-management.module#DiscountsManagementModule',
      },
      {
        path: '',
        pathMatch: 'exact',
        redirectTo: 'sucursales'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
