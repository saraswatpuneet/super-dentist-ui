import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialistRoutingModule } from './specialist-routing.module';
import { SpecialistComponent } from './specialist.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SpecialistComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    SpecialistRoutingModule
  ]
})
export class SpecialistModule { }
