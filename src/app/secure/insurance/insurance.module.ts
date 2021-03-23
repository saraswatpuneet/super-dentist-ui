import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule } from 'ngx-mask';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceComponent } from './insurance.component';
import { InsuranceRegistrationModule } from 'src/app/shared/insurance-registration/insurance-registration.module';

@NgModule({
  declarations: [InsuranceComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    InsuranceRegistrationModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    NgxMaskModule,
    ReactiveFormsModule,
    InsuranceRoutingModule
  ]
})
export class InsuranceModule { }
