import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EarlyAccessComponent } from './early-access.component';

const routes: Routes = [
  { path: '', component: EarlyAccessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EarlyAccessRoutingModule { }
