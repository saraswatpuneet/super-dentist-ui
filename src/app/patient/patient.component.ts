import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

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
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.watchRoute();
  }

  private watchRoute(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.qrInfo = {
        secureyKey: params.secureKey,
        placeIds: JSON.parse(params.placeIds)
      };
    });
  }
}
