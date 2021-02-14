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
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: appAnimations
})
export class AppComponent extends Base implements OnInit {
  theme = 'light';
  authenticated = false;
  emailVerified = true;
  expanded = false;
  navItems = [
    { path: 'specialist', label: 'Specialist', icon: 'date_range' },
    { path: 'referrals', label: 'Referrals', icon: 'message' },
    { path: 'settings', label: 'Settings', icon: 'settings' },
  ];
  isSpecialist = false;
  isAdmin = false;
  clinicName = '';
  private expandedKey = 'sdNavExpanded';
  private themeKey = 'sdTheme';

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

    const theme = localStorage.getItem(this.themeKey);
    if (theme === 'light') {
      this.theme = 'light';
      this.overlayContainer.getContainerElement().classList.remove('dark');
      this.overlayContainer.getContainerElement().classList.add(this.theme);
    } else if (theme === 'dark') {
      this.theme = 'dark';
      this.overlayContainer.getContainerElement().classList.remove('light');
      this.overlayContainer.getContainerElement().classList.add(this.theme);
    } else {
      this.theme = 'light';
      this.overlayContainer.getContainerElement().classList.remove('dark');
      this.overlayContainer.getContainerElement().classList.add(this.theme);
    }

    this.router.events.pipe(filter(e => e instanceof NavigationEnd), takeUntil(this.unsubscribe$)).subscribe(() => {
      if (
        this.router.url.includes('/login') ||
        this.router.url.includes('/join') ||
        this.router.url.includes('/patient') ||
        this.router.url.includes('/verify') ||
        this.router.url.includes('/404') ||
        this.router.url === '/'
      ) {
        this.authenticated = false;
      } else {
        this.authenticated = true;
        this.clinicService.getClinics()
          .pipe(take(1))
          .subscribe(myClinics => {
            const c = myClinics.data.clinicDetails;
            if (c.length === 1 && c[0].type === 'dentist') {
              this.navItems[0].label = 'Specialist';
              this.isSpecialist = false;
            } else {
              this.isSpecialist = true;
              this.navItems[0].label = 'Referring Clinics';
            }

            if (c[0] && c[0].name) {
              this.clinicName = c[0].name;
            }

            this.clinicService.setMyClinics(c[0]);
          });
        from(this.auth.currentUser).pipe(take(1)).subscribe(user => this.emailVerified = user.emailVerified);
      }
    });

    this.iconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/icons.svg'));
  }

  signOut(): void {
    this.auth.signOut().then(() => {
      this.authenticated = false;
      this.isSpecialist = false;
      this.clinicName = undefined;
      this.router.navigate(['./login']);
      this.clinicService.setMyClinics(undefined);
    });
  }

  toggleTheme(): void {
    this.overlayContainer.getContainerElement().classList.remove(this.theme);

    if (this.theme === 'dark') {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }

    localStorage.setItem(this.themeKey, this.theme);
    this.overlayContainer.getContainerElement().classList.add(this.theme);
  }

  toggleNav(): void {
    this.expanded = !this.expanded;
    localStorage.setItem(this.expandedKey, `${this.expanded}`);
  }
}
