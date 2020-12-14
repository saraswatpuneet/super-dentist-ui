import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferralsBetaComponent } from './referrals-beta.component';

const routes: Routes = [{ path: '', component: ReferralsBetaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferralsBetaRoutingModule { }
