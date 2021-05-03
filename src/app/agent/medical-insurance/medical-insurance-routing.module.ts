import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MedicalInsuranceComponent } from './medical-insurance.component';

const routes: Routes = [
  { path: '', component: MedicalInsuranceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalInsuranceRoutingModule { }
