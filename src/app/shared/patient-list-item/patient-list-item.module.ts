import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PatientListItemComponent } from './patient-list-item.component';
import { PatientStatusPillModule } from '../patient-status-pill/patient-status-pill.module';

@NgModule({
  declarations: [
    PatientListItemComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    PatientStatusPillModule,
  ],
  exports: [PatientListItemComponent],
})
export class PatientListItemModule { }
