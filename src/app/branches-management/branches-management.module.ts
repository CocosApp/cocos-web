import { NgModule } from '@angular/core';

import { BranchesManagementRoutingModule } from './branches-management-routing.module';
import { BranchesManagementComponent } from './branches-management.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    BranchesManagementRoutingModule
  ],
  declarations: [BranchesManagementComponent, BranchListComponent, BranchDetailsComponent]
})
export class BranchesManagementModule { }
