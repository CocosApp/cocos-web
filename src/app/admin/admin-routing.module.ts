import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProfileComponent } from './profile/profile.component';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'perfil',
        component: ProfileComponent,
      },
      {
        path: '',
        component: TabsComponent,
        children: [
          {
            path: 'restaurantes',
            loadChildren: 'app/branches-management/branches-management.module#BranchesManagementModule',
          },
          {
            path: 'descuentos',
            loadChildren: 'app/discounts-management/discounts-management.module#DiscountsManagementModule',
          },
          {
            path: '',
            pathMatch: 'exact',
            redirectTo: 'restaurantes'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
