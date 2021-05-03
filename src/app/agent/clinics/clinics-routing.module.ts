import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClinicsComponent } from './clinics.component';

const routes: Routes = [
  { path: '', component: ClinicsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicsRoutingModule { }
