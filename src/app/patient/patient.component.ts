import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';

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
  qrInfo: QRInfo;
  private googleApi = 'https://maps.googleapis.com/maps/api/place/details/output';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.watchRoute();
  }

  private watchRoute(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      if (params.secureKey) {
        this.qrInfo = {
          secureyKey: params.secureKey,
          placeIds: JSON.parse(params.placeIds)
        };

        this.http.get(`${this.googleApi}?key=${environment.firebase.apiKey}&place_id=${this.qrInfo.placeIds.to[0]}`)
          .pipe(take(1)).subscribe(console.log);
      }
    });
  }
}
