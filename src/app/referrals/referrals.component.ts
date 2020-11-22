import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ReferralService } from '../shared/services/referral.service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit {
  referrals = [];

  constructor(private referralService: ReferralService) { }

  ngOnInit(): void {
    this.referralService.getSpecialist().pipe(take(1)).subscribe(res => this.referrals = res.data);
  }

}
