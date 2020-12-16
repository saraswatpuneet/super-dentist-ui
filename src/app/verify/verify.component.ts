import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { take, flatMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { ClinicService } from '../shared/services/clinic.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  sentEmail = false;
  userEmail = '';

  constructor(private auth: AngularFireAuth, private router: Router, private clinicService: ClinicService, ) { }

  ngOnInit(): void {
    this.auth.currentUser.then(user => this.userEmail = user.email);
  }

  resendEmail(): void {
    from(this.auth.currentUser).pipe(
      flatMap(user => this.clinicService.registerAdmin(user.email, true)),
      take(1)
    ).subscribe(res => {
      if (res.error == null) {
        this.sentEmail = true;
      }
    });
  }

  home(): void {
    this.router.navigate(['referrals']);
  }
}
