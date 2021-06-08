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
  teeth = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeTeeth();
  }

  addHistory(): void {
    this.historyForm.push(
      this.fb.group({
        date: [''],
        tooth: [],
      }));
  }

  removeHistory(i: number): void {
    this.historyForm.removeAt(i);
  }

  private initializeTeeth(): void {
    this.teeth = [...Array(33).keys()].map(tooth => ({ label: tooth, value: tooth })).slice(1);
    [
      { label: 'Lower left', value: 'lowerLeft' },
      { label: 'Lower right', value: 'lowerRight' },
      { label: 'Upper left', value: 'lowerLeft' },
      { label: 'Upper right', value: 'lowerRight' },
    ].forEach(d => this.teeth.unshift(d));
    this.teeth.unshift({ label: '--', value: undefined });
  }

}
