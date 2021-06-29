import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReconciliationRoutingModule } from './reconciliation-routing.module';
import { ReconciliationComponent } from './reconciliation.component';


@NgModule({
  declarations: [
    ReconciliationComponent
  ],
  imports: [
    CommonModule,
    ReconciliationRoutingModule
  ]
})
export class ReconciliationModule { }
