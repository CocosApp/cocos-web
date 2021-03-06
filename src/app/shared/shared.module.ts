import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule, MatCardModule, MatDialogModule, MatToolbarModule, MatMenuModule, MatButtonModule, 
  MatTabsModule, MatInputModule, MatTooltipModule, MatSelectModule, MatIconModule, MatStepperModule, MAT_DATE_LOCALE, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { InstanceResolverForBranch, InstanceResolverForDiscount } from './resolvers/instance.resolver';
import { MaterialTimeControlModule } from './vendor/material-time-control/material-time-control.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';
import { GoToBackDirective } from './directives/go-to-back.directive';
import './extensions/array.extensions';
import './extensions/date.extensions';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SuccessComponent } from './components/success/success.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialTimeControlModule,
    MatDialogModule,
    MatButtonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMaps.apiKey,
      libraries: ["places"]
    })
  ],
  entryComponents: [
    SuccessComponent,
    ConfirmDialogComponent
  ],
  declarations: [ GoToBackDirective, SuccessComponent, ConfirmDialogComponent ],
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
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    SuccessComponent,
    ConfirmDialogComponent
  ],
  providers: [
    InstanceResolverForBranch,
    InstanceResolverForDiscount,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ]
})
export class SharedModule { }
