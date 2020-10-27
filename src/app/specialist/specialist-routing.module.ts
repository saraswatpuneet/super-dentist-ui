import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialistComponent } from './specialist.component';

const routes: Routes = [{ path: '', component: SpecialistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistRoutingModule { }
