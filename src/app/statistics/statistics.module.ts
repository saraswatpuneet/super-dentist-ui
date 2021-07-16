import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }
