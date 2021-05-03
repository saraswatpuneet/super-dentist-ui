import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DentalInsuranceComponent } from './dental-insurance.component';

const routes: Routes = [
  { path: '', component: DentalInsuranceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DentalInsuranceRoutingModule { }
