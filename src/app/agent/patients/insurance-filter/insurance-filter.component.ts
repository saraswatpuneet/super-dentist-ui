import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-insurance-filter',
  templateUrl: './insurance-filter.component.html',
  styleUrls: ['./insurance-filter.component.scss']
})
export class InsuranceFilterComponent implements OnInit {
  @Input() insuranceCompaniesForFilter = [];
  @Input() selectedOptions = [];
  @Output() apply = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();
  selectedCompanies: any = {};
  filteredInsurances = [];
  searchFilter = '';

  constructor() { }

  ngOnInit(): void {
    this.filteredInsurances = [...this.insuranceCompaniesForFilter];
    this.selectedOptions.forEach(selection => this.selectedCompanies[selection] = true);
  }

  updateSelection($event: any, company: string): void {
    if ($event.checked) {
      this.selectedCompanies[company] = true;
    } else {
      delete this.selectedCompanies[company];
    }
  }

  filterInsurances(): void {
    this.filteredInsurances = this.insuranceCompaniesForFilter.filter(company => company.toLowerCase().includes(this.searchFilter));
  }

  sendApply(): void {
    const companies = Object.keys(this.selectedCompanies);
    this.apply.emit(companies);
  }
}
