import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DentalBreakDowns } from 'src/app/insurance-completion/insurance-completion2';

@Component({
  selector: 'app-code-inputs',
  templateUrl: './code-inputs.component.html',
  styleUrls: ['./code-inputs.component.scss']
})
export class CodeInputsComponent implements OnInit {
  @Input() unitOptions = [];
  @Input() increments = [];
  @Input() radioOptions = [];
  @Input() groups: FormArray;
  @Input() codes: DentalBreakDowns;

  constructor() { }

  ngOnInit(): void {
    console.log(this);
  }

}
