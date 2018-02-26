import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule, MatCardModule, MatDialogModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatTabsModule, MatInputModule, MatTooltipModule, MatSelectModule } from '@angular/material';
import { InstanceResolverForBranch } from './resolvers/instance.resolver';
import { MaterialTimeControlModule } from './vendor/material-time-control/material-time-control.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialTimeControlModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    MatSelectModule,
    MaterialTimeControlModule
  ],
  providers: [
    InstanceResolverForBranch
  ]
})
export class SharedModule { }
