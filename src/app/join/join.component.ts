import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { catchError, debounceTime, delay, filter, flatMap, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { joinAnimations } from './join.animations';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { Base } from 'src/app/shared/base/base-component';

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
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
  animations: joinAnimations
})
export class JoinComponent extends Base implements OnInit {
  active = 0;
  selectedClinic: Clinic = Clinic.Dentist;
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
  selectedAddress = { name: '', formatted_address: '' };
  errorMessage = '';
  count = 0;
  loading = false;
  steps = [
    { label: 'Create Account', step: 1 },
    { label: 'Search for your clinic', step: 2 },
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
  }

  setSelected(): void {
    this.count = this.specialistTypes.filter(s => s.selected === true).length;
  }

  selectAddress(addy: any): void {
    this.fromSelection = true;
    this.selectedAddress = addy;
    this.clinicForm.patchValue({
      address: ''
    });
    this.filteredOptions = [];
  }

  goToLogin(): void {
    this.router.navigate(['./login']);
  }

  join(): void {
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
        tap(currentUser => currentUser.sendEmailVerification()),
        take(1)
      ).subscribe(() => {
        this.loading = false;
        this.active = 1;
      });
  }

  registerClinic(): void {
    const clinic = this.clinicForm.value;
    const account = this.accountForm.value;
    this.loading = true;
    this.clinicService.registerAdmin(account.email, true).pipe(
      switchMap(() => this.clinicService.addClinic([{
        address: this.selectedAddress.formatted_address,
        emailAddress: account.email,
        name: this.selectedAddress.name,
        phoneNumber: '',
        speciality: this.specialistTypes.filter(s => s.selected).map(y => y.value),
        type: clinic.selectedClinic,
      }])),
      take(1)
    ).subscribe(() => this.router.navigate(['']));
  }

  private initForm(): void {
    this.clinicForm = this.fb.group({
      selectedClinic: [Clinic.Dentist],
      address: ['', Validators.required],
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