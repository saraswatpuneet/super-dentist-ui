import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HighchartsChartModule } from 'highcharts-angular';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HighchartsChartModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    OverviewRoutingModule
  ]
})
export class OverviewModule { }
