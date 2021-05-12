import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-agent-menu',
  templateUrl: './agent-menu.component.html',
  styleUrls: ['./agent-menu.component.scss']
})
export class AgentMenuComponent implements OnInit {
  @Input() agents = [];
  @Output() selectedAgent = new EventEmitter<any>();
  searchFilter = '';
  filteredAgents = [];

  constructor() { }

  ngOnInit(): void {
    this.filteredAgents = [...this.agents];
  }

  filterByAgent(): void {
    this.filteredAgents = this.agents.filter(agent => agent.toLowerCase().includes(this.searchFilter.toLowerCase()));
  }
}
