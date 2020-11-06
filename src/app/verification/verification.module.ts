import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';

@NgModule({
  declarations: [VerificationComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    VerificationRoutingModule
  ]
})
export class VerificationModule { }
