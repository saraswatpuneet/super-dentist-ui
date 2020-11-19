import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { LoaderModule } from 'src/app/shared/loader/loader.module';
import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
  declarations: [VerificationComponent, VerifyEmailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    LoaderModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    FlexLayoutModule,
    VerificationRoutingModule
  ]
})
export class VerificationModule { }
