import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { BankingRoutingModule } from './banking-routing.module';
import { BankingComponent } from './banking.component';

@NgModule({
  declarations: [
    BankingComponent
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
    BankingRoutingModule
  ]
})
export class BankingModule { }
