import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';

@NgModule({
  declarations: [
    AccountingComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HighchartsChartModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    AccountingRoutingModule
  ]
})
export class AccountingModule { }
