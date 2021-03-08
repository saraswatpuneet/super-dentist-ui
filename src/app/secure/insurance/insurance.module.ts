import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMaskModule } from 'ngx-mask';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceComponent } from './insurance.component';
import { DobComponent } from './shared/dob/dob.component';

@NgModule({
  declarations: [InsuranceComponent, DobComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    NgxMaskModule,
    ReactiveFormsModule,
    InsuranceRoutingModule
  ]
})
export class InsuranceModule { }
