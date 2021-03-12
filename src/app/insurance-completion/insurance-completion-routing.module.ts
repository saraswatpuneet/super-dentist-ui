import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsuranceCompletionComponent } from './insurance-completion.component';

const routes: Routes = [
  { path: '', component: InsuranceCompletionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceCompletionRoutingModule { }
