import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialistComponent } from './specialist.component';
import { IsClinicGuard } from '../isClinic.guard';

const routes: Routes = [{ path: '', component: SpecialistComponent, canActivate: [IsClinicGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistRoutingModule { }
