import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ClinicService } from '../shared/services/clinic.service';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  sentEmail = false;
  userEmail = '';

  constructor(private auth: AngularFireAuth, private router: Router, private clinicService: ClinicService,) { }

  ngOnInit(): void {
    this.auth.currentUser.then(user => this.userEmail = user.email);
  }

  resendEmail(): void {
    
    this.auth.currentUser.then(user => {
      this.clinicService.registerAdmin(user.email, true).pipe(take(1))
      .subscribe(response => {
        if (response.error == null) {
          this.sentEmail = true;
        }
      });
    });
  }

  home(): void {
    this.router.navigate(['referrals']);
  }
}
