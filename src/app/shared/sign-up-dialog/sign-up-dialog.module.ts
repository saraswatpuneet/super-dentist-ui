import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { SignUpDialogComponent } from './sign-up-dialog.component';

@NgModule({
  declarations: [SignUpDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    FlexLayoutModule,
  ],
  exports: [SignUpDialogComponent]
})
export class SignUpDialogModule { }
