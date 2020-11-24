import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { VerifyRoutingModule } from './verify-routing.module';
import { VerifyComponent } from './verify.component';

@NgModule({
  declarations: [VerifyComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    VerifyRoutingModule
  ]
})
export class VerifyModule { }
