import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KpiComponent } from './kpi.component';
import { IsClinicGuard } from '../isClinic.guard';

const routes: Routes = [
  { path: '', component: KpiComponent, canActivate: [IsClinicGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KpiRoutingModule { }
