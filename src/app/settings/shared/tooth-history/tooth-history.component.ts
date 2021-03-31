import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tooth-history',
  templateUrl: './tooth-history.component.html',
  styleUrls: ['./tooth-history.component.scss']
})
export class ToothHistoryComponent implements OnInit {
  @Input() historyForm: FormArray;
  @Input() label = '';
  @Input() radioOptions = [];
  hasHistory = 'no';
  teeth = [...Array(33).keys()].slice(1);
  quadrants = [
    { label: 'Lower left', value: 'lowerLeft' },
    { label: 'Lower right', value: 'lowerRight' },
    { label: 'Upper left', value: 'lowerLeft' },
    { label: 'Upper right', value: 'lowerRight' },
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  addHistory(): void {
    this.historyForm.push(
      this.fb.group({
        date: [],
        tooth: ['1'],
        quadrant: ['lowerLeft']
      }));
  }

  removeHistory(i: number): void {
    this.historyForm.removeAt(i);
  }

  toggleHistory(): void {
    if (this.hasHistory === 'no') {
      this.historyForm.clear();
    }
  }

}
