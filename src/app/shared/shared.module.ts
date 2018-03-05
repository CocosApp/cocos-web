import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule, MatCardModule, MatDialogModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatTabsModule, MatInputModule, MatTooltipModule, MatSelectModule, MatIconModule, MatStepperModule } from '@angular/material';
import { InstanceResolverForBranch } from './resolvers/instance.resolver';
import { MaterialTimeControlModule } from './vendor/material-time-control/material-time-control.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialTimeControlModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMaps.apiKey,
      libraries: ["places"]
    })
  ],
  declarations: [],
  exports: [
    AgmCoreModule,
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
    MaterialTimeControlModule,
    MatIconModule,
    MatStepperModule
  ],
  providers: [
    InstanceResolverForBranch
  ]
})
export class SharedModule { }
