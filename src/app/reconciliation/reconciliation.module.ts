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
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReconciliationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    HighchartsChartModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReconciliationRoutingModule
  ]
})
export class ReconciliationModule { }
