import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { VerifyRoutingModule } from './verify-routing.module';
import { VerifyComponent } from './verify.component';

@NgModule({
  declarations: [VerifyComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    VerifyRoutingModule
  ]
})
export class VerifyModule { }
