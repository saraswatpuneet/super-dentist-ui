import { Component, OnInit, Input } from '@angular/core';
import { DentalBreakDowns } from 'src/app/shared/services/insurance';
import { FormArray } from '@angular/forms';

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
  @Input() codes: DentalBreakDowns;
  @Input() codeList = [];

  constructor() { }

  ngOnInit(): void {
  }

  changeFixed(index: number, breakdownKey: string): void {
    const control = this.groups.controls[index].get(breakdownKey);
    control.patchValue({
      min: undefined,
      max: undefined
    });
  }

  changeRange(index: number, breakdownKey: string): void {
    const control = this.groups.controls[index].get(breakdownKey);
    control.patchValue({
      fixed: undefined
    });
  }
}
