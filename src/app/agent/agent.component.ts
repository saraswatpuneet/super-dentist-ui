import { Component, OnInit } from '@angular/core';

// Status for insurance

// Pending
// Active
// Inactive
// Termed - with a date
// Incomplete information - Should have a list of wrong fields, updates user. Can type message for now
// Discount plan
// Medicare plan
//

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
