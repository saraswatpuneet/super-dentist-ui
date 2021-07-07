import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferralsComponent } from './referrals.component';
import { IsClinicGuard } from '../isClinic.guard';

const routes: Routes = [{ path: '', component: ReferralsComponent, canActivate: [IsClinicGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferralsRoutingModule { }
