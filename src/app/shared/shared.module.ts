import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule, MatCardModule, MatDialogModule, MatToolbarModule, MatMenuModule, MatButtonModule, 
  MatTabsModule, MatInputModule, MatTooltipModule, MatSelectModule, MatIconModule, MatStepperModule, MAT_DATE_LOCALE } from '@angular/material';
import { InstanceResolverForBranch, InstanceResolverForDiscount } from './resolvers/instance.resolver';
import { MaterialTimeControlModule } from './vendor/material-time-control/material-time-control.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';
import { GoToBackDirective } from './directives/go-to-back.directive';
import './extensions/array.extensions';
import './extensions/date.extensions';

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
  declarations: [ GoToBackDirective ],
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
    MatStepperModule,
    GoToBackDirective,
    MatRadioModule
  ],
  providers: [
    InstanceResolverForBranch,
    InstanceResolverForDiscount,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ]
})
export class SharedModule { }
