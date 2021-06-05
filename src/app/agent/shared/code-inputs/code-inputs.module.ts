import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CodeInputsComponent } from './code-inputs.component';

@NgModule({
  declarations: [CodeInputsComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatRadioModule,
    MatSelectModule,
  ],
  exports: [CodeInputsComponent]
})
export class CodeInputsModule { }
