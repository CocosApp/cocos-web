import { NgModule } from '@angular/core';

import { DiscountsManagementRoutingModule } from './discounts-management-routing.module';
import { DiscountsManagementComponent } from './discounts-management.component';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { DiscountDetailsComponent } from './discount-details/discount-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    DiscountsManagementRoutingModule
  ],
  declarations: [DiscountsManagementComponent, DiscountListComponent, DiscountDetailsComponent]
})
export class DiscountsManagementModule { }
