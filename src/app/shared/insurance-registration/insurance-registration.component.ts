import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { insuranceAnimations } from './insurance-registration.animations';
import { Base } from '../base/base-component';

enum PatientStates {
  Invalid,
  Processing,
  Form,
  Success,
  Failed
}

@Component({
  selector: 'app-insurance-registration',
  templateUrl: './insurance-registration.component.html',
  styleUrls: ['./insurance-registration.component.scss'],
  animations: insuranceAnimations
})
export class InsuranceRegistrationComponent extends Base implements OnInit {
  @Input() canCancel = false;
  @Input() referralId: string;
  @Input() clinics: any[];
  @Input() dentalCompanies = [];
  @Output() cancelRegistration = new EventEmitter();
  selectedClinic: any;
  insuranceForm: FormGroup;
  moreDental = false;
  moreMedical = false;
  state = PatientStates.Form;
  patientStates = PatientStates;
  dentalLabels = ['Primary Dental', 'Secondary Dental', 'Tertiary Dental'];
  medicalLabels = ['Primary Medical', 'Secondary Medical', 'Tertiary Medical'];
  medicalInsurances = [];
  dentalInsurances = [];
  selectedDental = false;
  selectedMedical = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) { super(); }

  ngOnInit(): void {
    if (this.clinics && this.clinics.length > 0) {
      this.selectedClinic = this.clinics[0];
    }
    this.initForm();

  }

  onCancel(): void {
    this.selectedDental = false;
    this.selectedMedical = false;
  }

  removeDentalInsurance(index: number): void {
    this.dentalInsurances.splice(index, 1);
  }

  removeMedicalInsurance(index: number): void {
    this.medicalInsurances.splice(index, 1);
  }

  onAddDentalInsurance(insurance: any): void {
    this.dentalInsurances.push(insurance);
    this.onCancel();
  }

  onAddMedicalInsurance(insurance: any): void {
    this.medicalInsurances.push(insurance);
    this.onCancel();
  }

  submit(): void {
    const url = `${environment.baseUrl}/patient/registration`;
    const formData = new FormData();
    const p = this.insuranceForm.value;

    if (this.dentalInsurances.length > 0) {
      this.dentalInsurances.forEach(d => d.status = { value: 'pending', label: 'Pending' });
      formData.append('dentalInsurance', JSON.stringify(this.dentalInsurances));
    }
    if (this.medicalInsurances.length > 0) {
      this.medicalInsurances.forEach(d => d.status = { value: 'pending', label: 'Pending' });
      formData.append('medicalInsurance', JSON.stringify(this.medicalInsurances));
    }

    if (this.referralId) {
      formData.append('referralId', this.referralId);
    }

    if (this.clinics && this.clinics.length > 0) {
      formData.append('addressId', p.selectedClinic.addressId);
    }

    formData.append('firstName', p.firstName);
    formData.append('lastName', p.lastName);
    formData.append('dob', JSON.stringify(p.dob));
    this.state = PatientStates.Processing;
    this.http.post(url, formData)
      .pipe(take(1))
      .subscribe((res) => {
        this.state = PatientStates.Success;
      });
  }

  addDentalInsurance(): void {
    this.selectedDental = true;
  }

  addMedicalInsurance(): void {
    this.selectedMedical = true;
  }

  cancel(): void {
    this.cancelRegistration.emit();
  }

  private initForm(): void {
    this.insuranceForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: this.fb.group({
        month: ['01', Validators.required],
        day: ['1', Validators.required],
        year: ['2000', Validators.required],
      }),
      zipCode: ['', Validators.required],
      selectedClinic: [this.selectedClinic]
    });
  }
}
