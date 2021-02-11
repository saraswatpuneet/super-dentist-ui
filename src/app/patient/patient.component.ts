import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, NgZone, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment.local';
import { patientAnimations } from './patient.animations';

declare var google;

interface QRInfo {
  secureKey: string;
  placeIds: QRParamPlaceIds;
}

interface QRParamPlaceIds {
  from: string[];
  to: string[];
}

enum PatientStates {
  Init,
  Invalid,
  Processing,
  Form,
  Success,
  Failed
}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  animations: patientAnimations
})
export class PatientComponent implements OnInit, AfterViewInit {
  @ViewChild('m') m: ElementRef;
  patientForm: FormGroup;
  selectedIndex: number;
  selectedClinic: any;
  qrInfo: QRInfo;
  toPlaceDetails = [];
  fromPlaceDetails = [];
  patientStates = PatientStates;
  state = PatientStates.Init;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.setQrParams();
    console.log(window.location.origin.includes('dev.superdentist.io'));

    if (!this.qrInfo || !this.qrInfo.secureKey) {
      this.state = PatientStates.Invalid;
      return;
    }

    this.initForm();
  }

  ngAfterViewInit(): void {

    if ((window as any).google && (window as any).google.maps) {
      this.getPlaces();
    } else {
      this.initializeGoogleMapsApi();
    }

    this.state = PatientStates.Form;
  }

  completeReferral(): void {
    this.state = PatientStates.Processing;
    const p = this.patientForm.value;
    let good = true;
    let url = `https://us-central1-superdentist.cloudfunctions.net/sd-qr-referral?secureKey=${this.qrInfo.secureKey}&from=${this.fromPlaceDetails[0].place_id}&to=${p.selectedClinic.place_id}&firstName=${p.firstName}&lastName=${p.lastName}&phone=${p.phoneNumber}&email=${p.email}`;

    if (window.location.origin.includes('dev.superdentist.io') || window.location.origin.includes('localhost')) {
      url += '&env=dev';
    }

    this.http.post(url, null).pipe(
      catchError(err => {
        console.error(err);
        good = false;
        return of(false);
      }),
      take(1)
    ).subscribe(() => {
      this.state = PatientStates.Success;

      if (!good) {
        this.state = PatientStates.Failed;
      }
    });
  }

  private initForm(): void {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      selectedClinic: [null, Validators.required]
    });
  }

  private getPlaces(): void {
    const service = new google.maps.places.PlacesService(this.m.nativeElement);
    this.qrInfo.placeIds.to.forEach(toId => service.getDetails({ placeId: toId }, this.addToPlaceId.bind(this)));
    this.qrInfo.placeIds.from.forEach(toId => service.getDetails({ placeId: toId }, this.addFromPlaceId.bind(this)));
  }

  private addToPlaceId(place, status): void {
    this.ngZone.run(() => this.toPlaceDetails.push(place));
  }

  private addFromPlaceId(place, status): void {
    this.ngZone.run(() => this.fromPlaceDetails.push(place));
  }

  private initializeGoogleMapsApi(): void {
    this.http.jsonp(`https://maps.googleapis.com/maps/api/js?libraries=places&key=${environment.firebase.apiKey}`, 'callback').pipe(
      map(() => true),
      catchError((err) => { console.log(err); return of(false); }),
      take(1)
    ).subscribe(enabled => {
      if (enabled) {
        this.getPlaces();
        this.state = PatientStates.Form;
      } else {
        this.state = PatientStates.Invalid;
      }
    });
  }

  private setQrParams(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      if (params.secureKey) {
        this.qrInfo = {
          secureKey: params.secureKey,
          placeIds: JSON.parse(params.placeIds)
        };
      }
    });
  }
}
