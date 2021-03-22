import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { insuranceAnimations } from './insurance-registration.animations';

interface PatientForInsurance {
  firstName: string;
  lastName: string;
  dob: DOB;
  zipCode: string;
  dentalInsurance: PatientDentalInsurance[];
  medicalInsurance: PatientMedicalInsurance[];
}

interface DOB {
  year: string;
  month: string;
  day: string;
}

interface PatientDentalInsurance {
  company: string;
  memberId: string;
  subscriber: Subscriber;
}

interface PatientMedicalInsurance {
  company: string;
  groupNumber: string;
  ssn: string;
  subscriber: Subscriber;
}

interface Subscriber {
  firstName: string;
  lastName: string;
  dob: DOB;
}

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
export class InsuranceRegistrationComponent implements OnInit {
  @Input() canCancel = false;
  @Input() referralId: string;
  @Input() clinics: any[];
  @Output() cancelRegistration = new EventEmitter();
  selectedClinic: any;
  insuranceForm: FormGroup;
  moreDental = false;
  moreMedical = false;
  state = PatientStates.Form;
  patientStates = PatientStates;
  insurances = [];
  selectedDental = false;
  selectedMedical = false;
  displayMonths = {
    1: 'January',
    2: 'Febuary',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    if (this.clinics && this.clinics.length > 0) {
      this.selectedClinic = this.clinics[0];
    }
    console.log(this.selectedClinic);
    this.initForm();
  }

  onCancel(): void {
    this.selectedDental = false;
    this.selectedMedical = false;
  }

  removeInsurance(index: number): void {
    this.insurances.splice(index, 1);
  }

  onAddInsurance(insurance: any): void {
    this.insurances.push(insurance);
    this.onCancel();
  }

  submit(): void {
    const url = `${environment.baseUrl}/patient/registration`;
    const formData = new FormData();
    const p = this.insuranceForm.value;
    const dentalInsurance = [];
    const medicalInsurance = [];
    this.insurances.forEach(insurance => {
      if (insurance.groupNumber) {
        medicalInsurance.push(insurance);
      } else {
        dentalInsurance.push(insurance);
      }
    });
    if (dentalInsurance.length > 0) {
      formData.append('dentalInsurance', JSON.stringify(dentalInsurance));
    }
    if (medicalInsurance.length > 0) {
      formData.append('medicalInsurance', JSON.stringify(dentalInsurance));
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
        month: ['1', Validators.required],
        day: ['1', Validators.required],
        year: ['2000', Validators.required],
      }),
      zipCode: ['', Validators.required],
      selectedClinic: [this.selectedClinic]
    });
  }
}
