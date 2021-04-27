import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferralsBetaComponent } from './referrals-beta.component';
import { IsClinicGuard } from '../isClinic.guard';

const routes: Routes = [{ path: '', component: ReferralsBetaComponent, canActivate: [IsClinicGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferralsBetaRoutingModule { }
