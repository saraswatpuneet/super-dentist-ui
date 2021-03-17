import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import { InsuranceCompletionRoutingModule } from './insurance-completion-routing.module';
import { InsuranceCompletionComponent } from './insurance-completion.component';

@NgModule({
  declarations: [InsuranceCompletionComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    InsuranceCompletionRoutingModule
  ]
})
export class InsuranceCompletionModule { }
