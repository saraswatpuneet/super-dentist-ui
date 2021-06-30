import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankingRoutingModule } from './banking-routing.module';
import { BankingComponent } from './banking.component';


@NgModule({
  declarations: [
    BankingComponent
  ],
  imports: [
    CommonModule,
    BankingRoutingModule
  ]
})
export class BankingModule { }
