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

  constructor() { }

  ngOnInit(): void {
  }

  checkOtherOptions($event, selectThatChanged: string): void {
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
