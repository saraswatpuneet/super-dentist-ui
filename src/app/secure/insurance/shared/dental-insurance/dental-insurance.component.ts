import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dental-insurance',
  templateUrl: './dental-insurance.component.html',
  styleUrls: ['./dental-insurance.component.scss']
})
export class DentalInsuranceComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  @Output() addInsurance = new EventEmitter();
  dentalForm: FormGroup;
  subscriber = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dentalForm = this.fb.group({
      company: ['', Validators.required],
      memberId: ['', Validators.required]
    });
  }

  subscriber2(e): void {
    this.subscriber = e.checked;
    if (e.checked) {
      this.remove();
    } else {
      this.add();
    }
  }

  sendInsurance(): void {
    this.addInsurance.emit(this.dentalForm.value);
  }

  private add(): void {
    this.dentalForm.addControl('subscriber', this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: this.fb.group({
        month: ['1', Validators.required],
        day: ['1', Validators.required],
        year: ['2000', Validators.required],
      }),
    }));
    this.dentalForm.updateValueAndValidity();
  }

  private remove(): void {
    this.dentalForm.removeControl('subscriber');
  }
}
