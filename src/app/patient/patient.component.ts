import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, map, catchError, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import { Observable, of, from } from 'rxjs';

declare var google;
interface QRInfo {
  secureyKey: string;
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
  qrInfo: QRInfo;
  toPlaceDetails = [];
  fromPlaceDetails = [];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.setQrParams();

    if (!this.qrInfo || !this.qrInfo.secureyKey) {
      return;
    }

    if ((window as any).google && (window as any).google.maps) {
      this.getPlaces();
    } else {
      this.initializeGoogleMapsApi();
    }
  }

  private getPlaces(): void {
    const service = new google.maps.places.PlacesService(this.m.nativeElement);
    this.qrInfo.placeIds.to.forEach(toId => service.getDetails({ placeId: toId }, this.addToPlaceId.bind(this)));
    this.qrInfo.placeIds.from.forEach(toId => service.getDetails({ placeId: toId }, this.addFromPlaceId.bind(this)));
  }

  private addToPlaceId(place, status): void {
    console.log(place, status);
    this.toPlaceDetails.push(place);
  }

  private addFromPlaceId(place, status): void {
    console.log(place, status);
    this.fromPlaceDetails.push(place);
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
          secureyKey: params.secureKey,
          placeIds: JSON.parse(params.placeIds)
        };
      }
    });
  }
}
