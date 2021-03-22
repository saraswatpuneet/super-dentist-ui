import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { VisibleInsuranceFieldsComponent } from './visible-insurance-fields.component';

@NgModule({
  declarations: [VisibleInsuranceFieldsComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    VisibleInsuranceFieldsComponent
  ]
})
export class VisibleInsuranceFieldsModule { }
