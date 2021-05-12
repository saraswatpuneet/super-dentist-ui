import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-insurance-filter',
  templateUrl: './insurance-filter.component.html',
  styleUrls: ['./insurance-filter.component.scss']
})
export class InsuranceFilterComponent implements OnInit {
  @Input() insuranceCompaniesForFilter = [];
  filteredInsurances = [];
  searchFilter = '';

  constructor() { }

  ngOnInit(): void {
    this.filteredInsurances = [...this.insuranceCompaniesForFilter];
  }

  filterInsurances(): void {
    this.filteredInsurances = this.insuranceCompaniesForFilter.filter(company => company.toLowerCase().includes(this.searchFilter));
  }
}
