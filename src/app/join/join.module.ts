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
import { MatCardModule } from '@angular/material/card';

import { JoinRoutingModule } from './join-routing.module';
import { JoinComponent } from './join.component';
import { LoaderModule } from '../shared/loader/loader.module';
import { JoinFavoritesComponent } from './shared/join-favorites/join-favorites.component';

@NgModule({
  declarations: [JoinComponent, JoinFavoritesComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    LoaderModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    ReactiveFormsModule,
    JoinRoutingModule
  ]
})
export class JoinModule { }
