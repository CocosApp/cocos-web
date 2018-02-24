import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchesManagementComponent } from './branches-management.component';

const routes: Routes = [
  {
    path: '',
    component: BranchesManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesManagementRoutingModule { }
