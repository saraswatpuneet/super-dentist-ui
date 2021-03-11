import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-medical-insurance',
  templateUrl: './medical-insurance.component.html',
  styleUrls: ['./medical-insurance.component.scss']
})
export class MedicalInsuranceComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  @Output() addInsurance = new EventEmitter();
  medicalForm: FormGroup;
  subscriber = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.medicalForm = this.fb.group({
      company: ['', Validators.required],
      ssn: ['', Validators.required],
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
    this.addInsurance.emit(this.medicalForm.value);
  }

  private add(): void {
    this.medicalForm.addControl('subscriber', this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: this.fb.group({
        month: ['1', Validators.required],
        day: ['1', Validators.required],
        year: ['2000', Validators.required],
      }),
    }));
    this.medicalForm.updateValueAndValidity();
  }

  private remove(): void {
    this.medicalForm.removeControl('subscriber');
  }

}
