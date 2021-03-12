import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceCompletionRoutingModule } from './insurance-completion-routing.module';
import { InsuranceCompletionComponent } from './insurance-completion.component';


@NgModule({
  declarations: [InsuranceCompletionComponent],
  imports: [
    CommonModule,
    InsuranceCompletionRoutingModule
  ]
})
export class InsuranceCompletionModule { }
