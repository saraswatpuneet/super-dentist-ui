import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, switchMap, map, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { jsPDF } from 'jspdf';

import { ReferralService } from '../../../shared/services/referral.service';
import { Referral } from '../../../shared/services/referral';
import { reasonsMap } from '../../../shared/services/clinic';
import { Base } from 'src/app/shared/base/base-component';

@Component({
  selector: 'app-referral-summary',
  templateUrl: './referral-summary.component.html',
  styleUrls: ['./referral-summary.component.scss']
})
export class ReferralSummaryComponent extends Base implements OnInit {
  referral: Referral;
  reasonMap = reasonsMap;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private referralService: ReferralService
  ) { super(); }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      switchMap(params => {
        if (params.s) {
          return this.referralService.get(params.s);
        }
        return of(undefined);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(referral => this.referral = referral);
  }

  closeSummary(): void {
    this.route.queryParams.pipe(
      map(params => {
        const p = { ...params };
        delete p.s;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: p
        });
        return of();
      }),
      take(1)
    ).subscribe();
  }

  export(): void {
    const doc = new jsPDF();

    doc.text('Hello world!', 10, 10);
    doc.save('a4.pdf');
  }
}
