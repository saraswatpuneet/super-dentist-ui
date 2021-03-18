import { Component } from '@angular/core';

@Component({
  selector: 'app-eligibility-benefits',
  templateUrl: './eligibility-benefits.component.html',
  styleUrls: ['./eligibility-benefits.component.scss']
})
export class EligibilityBenefitsComponent {
  showInsurance = false;
  constructor() { }

  onCancelRegistration(): void {
    this.showInsurance = false;
  }
}
