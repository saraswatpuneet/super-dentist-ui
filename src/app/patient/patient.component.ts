import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import { of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var google;
interface QRInfo {
  secureKey: string;
  placeIds: QRParamPlaceIds;
}

interface QRParamPlaceIds {
  from: string[];
  to: string[];
}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  @ViewChild('m') m: ElementRef;
  patientForm: FormGroup;
  selectedToClinic: any;
  qrInfo: QRInfo;
  toPlaceDetails = [];
  fromPlaceDetails = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.setQrParams();

    if (!this.qrInfo || !this.qrInfo.secureKey) {
      return;
    }

    this.initForm();

    if ((window as any).google && (window as any).google.maps) {
      this.getPlaces();
    } else {
      this.initializeGoogleMapsApi();
    }

    setTimeout(() => console.log(this), 3000);
  }

  completeReferral(): void {
    const patient = this.patientForm.value;
    const url = `https://us-central1-superdentist.cloudfunctions.net/sd-qr-referral?secureKey=${this.qrInfo.secureKey}&from=${this.fromPlaceDetails[0].place_id}&to=${this.toPlaceDetails[0].place_id}&firstName=${patient.firstName}&lastName=${patient.lastName}&phone=${patient.phoneNumber}&email=${patient.email}&env=dev`;
    this.http.post(url, null).pipe(take(1)).subscribe(console.log);
  }

  private initForm(): void {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  private getPlaces(): void {
    const service = new google.maps.places.PlacesService(this.m.nativeElement);
    this.qrInfo.placeIds.to.forEach(toId => service.getDetails({ placeId: toId }, this.addToPlaceId.bind(this)));
    this.qrInfo.placeIds.from.forEach(toId => service.getDetails({ placeId: toId }, this.addFromPlaceId.bind(this)));
  }

  private addToPlaceId(place, status): void {
    this.toPlaceDetails.push(place);
    console.log(place, this);
    this.cdr.detectChanges();
  }

  private addFromPlaceId(place, status): void {
    this.fromPlaceDetails.push(place);
    this.cdr.detectChanges();
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
