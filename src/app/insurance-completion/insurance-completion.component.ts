import { Component, OnInit } from '@angular/core';

import { InsuranceGroup, InsuranceMap, generateGroups, generateGeneralInformation, generateCategories } from './insurance-completion';

@Component({
  selector: 'app-insurance-completion',
  templateUrl: './insurance-completion.component.html',
  styleUrls: ['./insurance-completion.component.scss']
})
export class InsuranceCompletionComponent implements OnInit {
  groups: InsuranceGroup[] = [];

  constructor() { }

  ngOnInit(): void {
    this.groups = generateGroups();
  }
}
