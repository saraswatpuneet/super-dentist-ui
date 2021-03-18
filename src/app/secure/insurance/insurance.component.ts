import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { insuranceAnimations } from './insurance.animations';

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
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss'],
  animations: insuranceAnimations
})
export class InsuranceComponent implements OnInit, OnDestroy {
  insuranceForm: FormGroup;
  moreDental = false;
  moreMedical = false;
  referralId = '';
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
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (!params.referral) {
        this.router.navigate(['404']);
        return;
      }
      this.referralId = params.referral;
    });
    this.initForm();
    this.signIn();
  }

  ngOnDestroy(): void {
    this.auth.signOut();
  }

  private signIn(): void {
    this.auth.signInAnonymously()
      .then((d) => {
        // Signed in..
        this.auth.onAuthStateChanged((user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            // ...
          } else {
            // User is signed out
            // ...
          }
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        // ...
      });
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
    if (!this.referralId) {
      this.router.navigate(['404']);
      return;
    }

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
    formData.append('referralId', this.referralId);
    formData.append('firstName', p.firstName);
    formData.append('lastName', p.lastName);
    formData.append('dob', JSON.stringify(p.dob));
    this.state = PatientStates.Processing;
    this.http.post(url, formData).pipe(take(1)).subscribe((res) => this.state = PatientStates.Success);
  }

  addDentalInsurance(): void {
    this.selectedDental = true;
  }

  addMedicalInsurance(): void {
    this.selectedMedical = true;
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
      zipCode: ['', Validators.required]
    });
  }
}
