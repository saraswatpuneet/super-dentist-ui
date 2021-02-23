import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HighchartsChartModule } from 'highcharts-angular';

import { KpiRoutingModule } from './kpi-routing.module';
import { KpiComponent } from './kpi.component';

@NgModule({
  declarations: [KpiComponent],
  imports: [
    CommonModule,
    MatCardModule,
    HighchartsChartModule,
    KpiRoutingModule
  ]
})
export class KpiModule { }
