import { NgModule } from '@angular/core';

import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { AdminAuthComponent } from './admin-auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AdminAuthRoutingModule
  ],
  declarations: [AdminAuthComponent, SigninComponent, SignupComponent]
})
export class AdminAuthModule { }
