import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentComponent } from './agent.component';
import { IsAgentGuard } from '../isAgent.guard';

const routes: Routes = [
  { path: '', component: AgentComponent, canActivate: [IsAgentGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
