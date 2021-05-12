import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

import { DentalBreakDowns } from 'src/app/shared/services/insurance';

@Component({
  selector: 'app-code-category',
  templateUrl: './code-category.component.html',
  styleUrls: ['./code-category.component.scss']
})
export class CodeCategoryComponent implements OnInit {
  @Input() unitOptions = [];
  @Input() increments = [];
  @Input() radioOptions = [];
  @Input() groups: FormArray;
  @Input() groupModel = [];
  @Input() codes: DentalBreakDowns;
  @Input() codeList = [];

  constructor() { }

  ngOnInit(): void {
  }

  changeFixed(index: number, breakdownKey: string): void {
    this.groupModel[index][breakdownKey].min = undefined;
    this.groupModel[index][breakdownKey].max = undefined;
  }

  changeRange(index: number, breakdownKey: string): void {
    this.groupModel[index][breakdownKey].fixed = undefined;
  }
}
