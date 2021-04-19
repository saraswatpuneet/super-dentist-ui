import { Component, OnInit, Input } from '@angular/core';
import { DentalBreakDowns } from 'src/app/shared/services/insurance';
import { FormArray, FormGroup } from '@angular/forms';

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

  checkOtherOptions($event, selectThatChanged: string): void {
    // console.log($event, selectThatChanged, this.groups);

    // removes key from all codes
    this.codeList.forEach(key => {
      this.groups.controls.forEach((group: FormGroup) => {
        const control = group.controls.codes.get(key);
        if (control) {
          const cas = control.get('sharedCodes');
          if (cas.value) {
            const index = cas.value.indexOf(selectThatChanged);
            if (index > -1) {
              cas.value.splice(index, 1);
              cas.setValue([...cas.value]);
            }
          }
        }
      });
    });

    //  Adds the key to other codes that were selected
    $event.value.forEach(key => {
      this.groups.controls.forEach((group: FormGroup) => {
        const control = group.controls.codes.get(key);
        if (control) {
          const cas = control.get('sharedCodes');
          if (cas.value) {
            cas.setValue([selectThatChanged, ...cas.value]);
          } else {
            cas.setValue([selectThatChanged]);
          }
        }
      });
    });

  }
}
