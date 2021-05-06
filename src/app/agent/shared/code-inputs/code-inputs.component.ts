import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DentalBreakDowns } from 'src/app/insurance-completion/insurance-completion2';

@Component({
  selector: 'app-code-inputs',
  templateUrl: './code-inputs.component.html',
  styleUrls: ['./code-inputs.component.scss']
})
export class CodeInputsComponent implements OnInit {
  @Input() unitOptions = [];
  @Input() hasMedicalNecessity = false;
  @Input() increments = [];
  @Input() radioOptions = [];
  @Input() groups: FormArray;
  @Input() codes: DentalBreakDowns;
  @Input() codeList = [];
  @Input() allCodes: DentalBreakDowns;
  @Input() groupModel = [];

  constructor() { }

  ngOnInit(): void {
  }

  checkOtherOptions($event, selectThatChanged: string): void {
    // removes key from all codes
    this.codeList.forEach(key => {
      this.groupModel.forEach((group) => {
        if (group.codes[key]) {
          if (group.codes[key].sharedCodes) {
            const index = group.codes[key].sharedCodes.indexOf(selectThatChanged);
            if (index > -1) {
              group.codes[key].sharedCodes.splice(index, 1);
              group.codes[key].sharedCodes = [...group.codes[key].sharedCodes];
            }
          }
        }
      });
    });

    //  Adds the key to other codes that were selected
    $event.value.forEach(key => {
      this.groupModel.forEach((group) => {
        if (group.codes[key]) {
          if (group.codes[key].sharedCodes) {
            group.codes[key].sharedCodes = [selectThatChanged, ...group.codes[key].sharedCodes];
          } else {
            group.codes[key].sharedCodes = [selectThatChanged];
          }
        }
      });
    });
  }
}
