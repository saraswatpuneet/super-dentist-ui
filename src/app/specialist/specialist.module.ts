import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { LoaderModule } from '../shared/loader/loader.module';
import { SpecialistRoutingModule } from './specialist-routing.module';
import { SpecialistComponent } from './specialist.component';

@NgModule({
  declarations: [SpecialistComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    LoaderModule,
    SpecialistRoutingModule
  ]
})
export class SpecialistModule { }
