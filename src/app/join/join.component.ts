import { Component, OnInit, NgZone, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { catchError, debounceTime, delay, switchMap, take, takeUntil, mergeMap, map, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { joinAnimations } from './join.animations';
import { ClinicService } from '../shared/services/clinic.service';
import { Base } from '../shared/base/base-component';
import { environment } from 'src/environments/environment';

declare var google;

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
export class JoinComponent extends Base implements OnInit, AfterViewInit {
  @ViewChild('m') m: ElementRef;
  placeDetails = [];
  accountForm: FormGroup;
  selectedAddress = { name: '', formatted_address: '' };
  errorMessage = '';
  loading = false;
  joinInfo: any;
  processing = false;
  validEmail = false;
  hasChanged = false;

  constructor(
    private fauth: AngularFireAuth,
    private clinicService: ClinicService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private http: HttpClient
  ) { super(); }

  ngOnInit(): void {
    this.setJoinParams();
    if (!this.joinInfo || !this.joinInfo.secureKey) {
      return;
    }

    this.initForm();
  }

  ngAfterViewInit(): void {
    if (!this.joinInfo || !this.joinInfo.secureKey) {
      return;
    }

    if ((window as any).google && (window as any).google.maps) {
      this.getPlaces();
    } else {
      this.initializeGoogleMapsApi();
    }
  }

  goToLogin(): void {
    this.router.navigate(['./login']);
  }

  join(): void {
    if (!this.joinInfo || !this.joinInfo.secureKey) {
      return;
    }
    const account = this.accountForm.value;
    this.loading = true;
    let hasError = false;

    from(this.fauth.setPersistence('session'))
      .pipe(
        mergeMap(() => this.fauth.createUserWithEmailAndPassword(account.email, account.password)),
        catchError(err => {
          this.errorMessage = err.message;
          this.loading = false;
          hasError = true;
          console.warn(err);
          return of(err);
        }),
        delay(1000),
        mergeMap(() => {
          if (hasError) {
            return of(undefined);
          }

          return this.clinicService.directJoin(this.joinInfo.secureKey, this.joinInfo.placeIds);
        }),
        take(1)
      ).subscribe(() => this.router.navigate(['specialist']));
  }

  private initForm(): void {

    this.accountForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
        validators: ConfirmedValidator('password', 'confirmPassword')
      });


    this.accountForm.get('email').valueChanges.pipe(
      tap(() => { this.processing = true; this.hasChanged = true; }),
      debounceTime(300),
      switchMap(value => from(this.fauth.fetchSignInMethodsForEmail(value)).pipe(catchError(err => of(err)))),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.processing = false;

      if (!Array.isArray(res)) {
        this.validEmail = false;
        return;
      }

      if (res.length > 0) {
        this.validEmail = false;
        return;
      }

      this.validEmail = true;
    });
  }

  private setJoinParams(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      if (params.secureKey && params.places) {
        this.joinInfo = {
          secureKey: params.secureKey,
          placeIds: JSON.parse(params.places).placeIds
        };
        console.log(this.joinInfo);
      }
    });
  }

  private getPlaces(): void {
    const service = new google.maps.places.PlacesService(this.m.nativeElement);
    this.joinInfo.placeIds.forEach(toId => service.getDetails({ placeId: toId }, this.addPlaceId.bind(this)));
  }

  private addPlaceId(place, status): void {
    this.ngZone.run(() => this.placeDetails.push(place));
  }

  private initializeGoogleMapsApi(): void {
    this.http.jsonp(`https://maps.googleapis.com/maps/api/js?libraries=places&key=${environment.firebase.apiKey}`, 'callback').pipe(
      map(() => true),
      catchError((err) => { console.log(err); return of(false); }),
      take(1)
    ).subscribe(enabled => {
      if (enabled) {
        this.getPlaces();
      }
    });
  }
}
