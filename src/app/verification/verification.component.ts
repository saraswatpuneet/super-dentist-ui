import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { dashboardAnimations } from './dashboard.animations';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { catchError, debounceTime, delay, filter, flatMap, switchMap, take, takeUntil } from 'rxjs/operators';
import { Base } from '../shared/base/base-component';
import { from, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

enum Clinic {
  Specialist = 'specialist',
  Dentist = 'dentist'
}

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  animations: dashboardAnimations
})
export class VerificationComponent extends Base implements OnInit {
  active = 0;
  selectedClinic: Clinic = Clinic.Dentist;
  connection$: WebSocketSubject<any>;
  specialistTypes = [
    { label: 'Endodontist', value: 'endodontist', selected: false },
    { label: 'Oral Surgeon', value: 'oralSurgeon', selected: false },
    { label: 'Orthodontist', value: 'orthodontist', selected: false },
    { label: 'Pediatric Dentist', value: 'pediatricDentist', selected: false },
    { label: 'Periodontist', value: 'periodontist', selected: false },
    { label: 'Prosthodontist', value: 'prosthodontist', selected: false },
  ];
  verifiedEmail = false;
  clinicForm: FormGroup;
  accountForm: FormGroup;
  filteredOptions = [];
  errorMessage = '';
  count = 0;
  loading = false;
  steps = [
    { label: 'Enter your clinic details', step: 1 },
    { label: 'Create Account', step: 2 },
  ];
  fromSelection = false;

  constructor(
    private auth: AngularFireAuth,
    private clinicService: ClinicService,
    private fb: FormBuilder,
    private router: Router,
  ) { super(); }

  ngOnInit(): void {
    this.initForm();
    // this.auth.idToken.pipe(take(1))
    //   .subscribe(id => {
    //     this.connection$ = webSocket({
    //       url: `wss://superdentist.io/api/sd/v1/clinic/queryAddress?Bearer ${id}`,
    //     });
    //     this.connection$.pipe(takeUntil(this.unsubscribe$)).subscribe(console.log);
    //   });
  }

  setSelected(): void {
    this.count = this.specialistTypes.filter(s => s.selected === true).length;
  }

  selectAddress(addy: any): void {
    this.fromSelection = true;
    this.clinicForm.patchValue({
      name: addy.name,
      address: addy.formatted_address
    });
    this.filteredOptions = [];
  }

  goToLogin(): void {
    this.router.navigate(['./login']);
  }

  sendAddress(address: string): void {
    this.connection$.next({ message: address });
  }

  getAllDoctors(): void {
    console.log('click');
    this.clinicService.getAllDoctors().pipe(take(1)).subscribe(console.log);
  }

  getClinics(): void {
    this.clinicService.getClinics().pipe(take(1)).subscribe(console.log);
  }

  // call verify first then add clinic
  createSpecialist(): void {
    const clinic = this.clinicForm.value;
    const account = this.accountForm.value;
    this.loading = true;
    from(this.auth.createUserWithEmailAndPassword(account.email, account.password))
      .pipe(
        catchError(err => {
          this.errorMessage = err.message;
          this.loading = false;
          return of(err);
        }),
        flatMap(() => this.auth.currentUser),
        delay(1000),
        switchMap(currentUser => {
          currentUser.sendEmailVerification();
          return this.clinicService.registerAdmin(account.email, true);
        }),
        switchMap(() => this.clinicService.addClinic([{
          address: clinic.address,
          emailAddress: account.email,
          name: clinic.name,
          phoneNumber: clinic.number,
          speciality: this.specialistTypes.filter(s => s.selected).map(y => y.value),
          type: clinic.selectedClinic,
        }])),
        take(1)
      ).subscribe(() => {
        this.router.navigate(['']);
      });
  }

  private initForm(): void {
    this.clinicForm = this.fb.group({
      selectedClinic: [Clinic.Dentist],
      name: ['', Validators.required],
      address: ['', Validators.required],
      number: [undefined, Validators.required],
    });

    this.accountForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validators: ConfirmedValidator('password', 'confirmPassword')
    });

    this.clinicForm.get('address').valueChanges.pipe(
      filter(() => {
        let shouldSearch = true;
        if (this.fromSelection) {
          shouldSearch = false;
          this.fromSelection = false;
        }
        return shouldSearch;
      }),
      debounceTime(300),
      switchMap(value => this.clinicService.getAddress(value)),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => this.filteredOptions = res.data.addressList);
  }
}
