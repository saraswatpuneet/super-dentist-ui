import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { ReconciliationRoutingModule } from './reconciliation-routing.module';
import { ReconciliationComponent } from './reconciliation.component';

@NgModule({
  declarations: [
    ReconciliationComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HighchartsChartModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ReconciliationRoutingModule
  ]
})
export class ReconciliationModule { }
