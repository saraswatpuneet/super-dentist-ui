import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentComponent } from './agent.component';
import { AgentRoutingModule } from './agent-routing.module';

@NgModule({
  declarations: [
    AgentComponent,
  ],
  imports: [
    CommonModule,
    AgentRoutingModule
  ]
})
export class AgentModule { }
