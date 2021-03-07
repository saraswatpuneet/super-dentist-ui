import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { EarlyAccessRoutingModule } from './early-access-routing.module';
import { EarlyAccessComponent } from './early-access.component';

@NgModule({
  declarations: [EarlyAccessComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    NgxMaskModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    EarlyAccessRoutingModule
  ]
})
export class EarlyAccessModule { }
