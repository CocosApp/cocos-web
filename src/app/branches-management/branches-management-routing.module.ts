import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchesManagementComponent } from './branches-management.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';

const routes: Routes = [
  {
    path: '',
    component: BranchesManagementComponent,
    children: [
      {
        path: '',
        component: BranchListComponent
      },
      {
        path: 'agregar',
        component: BranchDetailsComponent,
      },
      {
        path: ':id',
        component: BranchDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesManagementRoutingModule { }
