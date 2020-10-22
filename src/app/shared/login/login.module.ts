import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';

import { LoginComponent } from './login.component';
import { SignUpDialogModule } from '../sign-up-dialog/sign-up-dialog.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    SignUpDialogModule,
    MatDialogModule,
    MatInputModule,
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
