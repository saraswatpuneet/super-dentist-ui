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
  selectedReferralIndex: number;

  constructor(private referralService: ReferralService) { }

  ngOnInit(): void {
    this.referralService.getSpecialist().pipe(take(1)).subscribe(res => this.referrals = res.data);
  }

  downloadFiles(id: string): void {
    console.log(id);
    this.referralService.downloadDocuments(id).pipe(take(1)).subscribe(res => {
      const url = window.URL.createObjectURL(new Blob([res], { type: 'application/zip' }));
      window.location.assign(url);
    });
  }

  referralChat(index: number): void {
    this.selectedReferralIndex = index;
    console.log(index);
  }
}
