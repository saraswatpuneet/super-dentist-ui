import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, take, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { OverlayContainer } from '@angular/cdk/overlay';
import { from } from 'rxjs';

import { Base } from './shared/base/base-component';
import { appAnimations } from './app.animations';
import { ClinicService } from './shared/services/clinic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: appAnimations
})
export class AppComponent extends Base implements OnInit {
  showSpecialist = false;
  theme = 'dark';
  authenticated = false;
  emailVerified = true;
  expanded = false;
  expandedKey = 'sdNavExpanded';
  navItems = [
    { path: 'specialist', label: 'Specialist', icon: 'date_range' },
    { path: 'referrals', label: 'Referrals', icon: 'message' },
  ];

  constructor(
    private domSanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry,
    private auth: AngularFireAuth,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private clinicService: ClinicService,
  ) { super(); }

  ngOnInit(): void {
    const expanded = localStorage.getItem(this.expandedKey);
    if (expanded === 'false') {
      this.expanded = false;
    } else if (expanded === 'true') {
      this.expanded = true;
    }

    this.router.events.pipe(filter(e => e instanceof NavigationEnd), takeUntil(this.unsubscribe$)).subscribe(() => {
      if (this.router.url.includes('login') || this.router.url.includes('join') || this.router.url.includes('verify')) {
        this.authenticated = false;
      } else {
        this.authenticated = true;
          this.clinicService.getClinics()
            .pipe(take(1))
            .subscribe(myClinics => {
              const c = myClinics.data.clinicDetails[0];
              this.clinicService.setMyClinics(c);
              if (c.type === 'dentist') {
                this.showSpecialist = true;
              } else {
                this.showSpecialist = false;
              }
            });
        from(this.auth.currentUser).pipe(take(1)).subscribe(user => this.emailVerified = user.emailVerified);
      }
    });

    this.iconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/icons.svg'));
  }

  signOut(): void {
    this.auth.signOut().then(() => {
      this.authenticated = false;
      this.router.navigate(['./login']);
    });
  }

  toggleTheme(): void {
    this.overlayContainer.getContainerElement().classList.remove(this.theme);
    if (this.theme === 'dark') {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }
    this.overlayContainer.getContainerElement().classList.add(this.theme);
  }

  toggleNav(): void {
    this.expanded = !this.expanded;
    localStorage.setItem(this.expandedKey, `${this.expanded}`);
  }
}
