import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    PatientsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
