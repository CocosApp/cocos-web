import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule, MatCardModule, MatDialogModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatTabsModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatButtonModule
  ]
})
export class SharedModule { }
