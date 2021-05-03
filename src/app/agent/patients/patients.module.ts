import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';

@NgModule({
  declarations: [
    PatientsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
