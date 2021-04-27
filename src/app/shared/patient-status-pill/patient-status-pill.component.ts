import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-patient-status-pill',
  templateUrl: './patient-status-pill.component.html',
  styleUrls: ['./patient-status-pill.component.scss']
})
export class PatientStatusPillComponent implements OnChanges {
  @Input() label: string;
  @Input() value: string;

  constructor() { }

  ngOnChanges(sc: SimpleChanges): void {
    if (!this.label) {
      this.label = 'Pending';
      this.value = 'pending';
    }
  }
}
