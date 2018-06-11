import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchesManagementComponent } from './branches-management.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { InstanceResolverForBranch } from '../shared/resolvers/instance.resolver';
import { CurrentUserResolver } from '../core/resolvers/current-user.resolver';

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
        resolve: {
          user: CurrentUserResolver
        }
      },
      {
        path: ':id',
        component: BranchDetailsComponent,
        resolve: {
          branch: InstanceResolverForBranch,
          user: CurrentUserResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesManagementRoutingModule { }
