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
import { MatButtonModule } from '@angular/material/button';

import { JoinRoutingModule } from './join-routing.module';
import { JoinComponent } from './join.component';
import { LoaderModule } from '../shared/loader/loader.module';

@NgModule({
  declarations: [JoinComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LoaderModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    FlexLayoutModule,
    JoinRoutingModule
  ]
})
export class JoinModule { }
