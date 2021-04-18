import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { IsClinicGuard } from '../isClinic.guard';

const routes: Routes = [
  { path: '', component: SettingsComponent, canActivate: [IsClinicGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
