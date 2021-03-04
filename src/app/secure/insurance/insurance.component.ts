import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

interface PatientForInsurance {
  firstName: string;
  lastName: string;
  dob: DOB;
  // email: string;
  // phone: string;
  ssn: string;
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
}

interface PatientMedicalInsurance {
  company: string;
  groupNumber: string;
  memberId: string;
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
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit, OnDestroy {
  insuranceForm: FormGroup;
  days = [...Array(31).keys()];
  years = [...Array(100).keys()];
  months = [];
  moreDental = false;
  referralId = '';
  subscriber = false;
  state = PatientStates.Form;
  patientStates = PatientStates;

  private objs = [
    newPatient('Mark', 'Inglis', '6', '3', '1966', 'Blue Cross Dental / Freedom Lawn Care', '80012800100'),
    newPatient('Michael', 'Bergenheier', '2', '2', '1967', 'Cigna Dental / Cigna Dental PPO', 'U66602619'),
    newPatient('Peter', 'Kelly', '7', '25', '1966', 'United Concordia / Keystone Motors', '101740797001'),
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AngularFireAuth,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (!params.referral) {
        this.router.navigate(['404']);
        return;
      }
      this.referralId = params.referral;
    });
    this.initForm(2);
    this.signIn();
  }

  ngOnDestroy(): void {
    this.auth.signOut();
  }

  signIn(): void {
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

  submit(): void {
    if (!this.referralId) {
      this.router.navigate(['404']);
      return;
    }

    const url = `${environment.baseUrl}/patient/registration`;
    const formData = new FormData();
    const p = this.insuranceForm.value;
    const dentalInsurance = [p.dentalInsurance];
    if (p.dentalInsurance2 && p.dentalInsurance2.company && p.dentalInsurance2.memberId) {
      dentalInsurance.push(p.dentalInsurance2);
    }
    formData.append('referralId', this.referralId);
    formData.append('firstName', p.firstName);
    formData.append('lastName', p.lastName);
    formData.append('dob', JSON.stringify(p.dob));
    formData.append('dentalInsurance', JSON.stringify(dentalInsurance));
    this.state = PatientStates.Processing;
    this.http.post(url, formData).pipe(take(1)).subscribe((res) => this.state = PatientStates.Success);
  }

  addDentalInsurance(): void {
    this.moreDental = true;
    this.insuranceForm.addControl('dentalInsurance2', this.fb.group({
      company: ['', Validators.required],
      memberId: ['', Validators.required]
    }));
    this.insuranceForm.updateValueAndValidity();
    this.cdr.detectChanges();
  }

  removeDentalInsurance(): void {
    this.moreDental = false;
    this.insuranceForm.removeControl('dentalInsurance2');
  }

  private initForm(index: number): void {
    const p = this.objs[index];

    this.insuranceForm = this.fb.group({
      firstName: [p.firstName, Validators.required],
      lastName: [p.lastName, Validators.required],
      // email: ['xthecounsel@gmail.com', Validators.required],
      // phoneNumber: ['3463171471', Validators.required],
      ssn: ['123-45-6789'],
      dob: this.fb.group({
        month: [p.dob.month, Validators.required],
        day: [p.dob.day, Validators.required],
        year: [p.dob.year, Validators.required],
      }),
      dentalInsurance: this.fb.group({
        company: [p.dentalInsurance.company, Validators.required],
        memberId: [p.dentalInsurance.memberId, Validators.required]
      }),
      dentalInsurance2: this.fb.group({
        company: [''],
        memberId: ['']
      }),
      // medicalInsurance: this.fb.group({
      //   company: [''],
      //   groupNumber: [''],
      //   memberId: ['']
      // })
    });
  }
}

function newPatient(firstName: string, lastName: string, month: string, day: string, year: string, company: string, memberId: string): any {
  return { firstName, lastName, dob: { month, day, year }, dentalInsurance: { company, memberId } };
}



// Time,Name,DOB,Subscriber,Subscriber DOB,Insurance,Patient zip,ID
// 8:00 AM,'Inglis, Mark',6/3/1966,'Inglis, Mark',6/3/1966,Blue Cross Dental / Freedom Lawn Care,18015,80012800100
// 8:00 AM,'Diehl, Scott',6/3/1957,'Diehl, Scott',6/3/1957,Delta Delta of Pa / Air Products,18036,201000007370794
// 8:00 AM,'Bergenheier, Michael',2/2/1967,'Bergenheier, Michael',2/2/1967,Cigna Dental / Cigna Dental PPO,18015,U66602619
// 8:00 AM,'Orlemann, Anthony',9/5/2003,'Orlemann, Christopher',2/3/1981,Delta Dental of Illinois / Carylon Corporation,18055,8032629148
// 8:00 AM,'Kauffman, Jacinta',9/13/1973,'Repasch, David',1/3/1969,Blue Cross Dental / City Of Bethlehem High Opt,18018,80160442700
// 8:50 AM,'Dore, Michael',5/6/1981,'Dore, Michael',5/6/1981,United Concordia / Southern Lehigh School,19468,110725950001
// 8:50 AM,'Rieger, Thomas F',7/19/1961,'Rieger, Thomas',7/19/1961,Delta Dental of PA / Lehigh Valley Health Network,18055,119277440201
// 8:50 AM,'Vliet, Tricia',2/18/1978,'Vliet, Jason',3/6/1972,Fidelio / Operating Engineers Local 825,18045,144895
// 8:50 AM,'Ford, Shannon M',10/13/1980,'Ford, Shannon',10/13/1980,United Concordia / St Luke's University Health,18018,123210811001
// 9:20 AM,'Kelly, Kathy A',9/16/1957,'Kelly, Peter',7/25/1966,United Concordia / Keystone Motors,18055,101740797001
// 9:20 AM,'CRAWFORD, REBECCA L',1/10/1996,'CRAWFORD, REBECCA L',1/10/1996,United Concordia / Step By Step Inc.,18353,128826337001
// 9:40 AM,'Danner, Andrea',11/24/1961,'Packer, Wayne',9/24/1965,Delta Dental of Arkansas / Wal Mart,18055,202588760
// 10:00 AM,'Lingle, Luke',4/22/2008,'Lingle, Luke',4/22/2008,Blue Cross Dental / Dental PPO,18055,80243637304
// 10:00 AM,'Kessler, Barry',3/13/1942,'Kessler, Barry',3/13/1942,Blue Cross Dental / BlueJourney PPO,18055,87002203700
// 10:30 AM,'Bialowasz, William R',11/4/1952,'Bialowasz, William R',11/4/1952,Aetna / N.j. State Employees,18103,W084921405
// 10:30 AM,'McDowell, Quinn',1/13/1990,'McDowell, Quinn',1/13/1990,United Concordia / LVBC Lehigh University,18015,123551417001
// 10:40 AM,'Buck, Linda',4/27/1943,'Buck, Linda',4/27/1943,United Concordia / Freedom Blue,18015,113597034001
