import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Base } from './shared/base/base-component';
import { appAnimations } from './app.animations';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: appAnimations
})
export class AppComponent extends Base implements OnInit {
  title = 'super-dentist';
  authenticated = false;
  expanded = false;
  expandedKey = 'sdNavExpanded';
  navItems = [
    { path: 'referrals', label: 'Referrals', icon: 'message' },
    { path: 'specialist', label: 'Specialist', icon: 'date_range' }
  ];

  constructor(
    private domSanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry,
    private auth: AngularFireAuth,
    private router: Router,
  ) { super(); }

  ngOnInit(): void {
    const expanded = localStorage.getItem(this.expandedKey);
    if (expanded === 'false') {
      this.expanded = false;
    } else if (expanded === 'true') {
      this.expanded = true;
    }

    this.router.events.pipe(filter(e => e instanceof NavigationEnd), takeUntil(this.unsubscribe$)).subscribe(e => {
      if (this.router.url.includes('login') || this.router.url.includes('verification')) {
        this.authenticated = false;
      } else {
        this.authenticated = true;
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

  toggleNav(): void {
    this.expanded = !this.expanded;
    localStorage.setItem(this.expandedKey, `${this.expanded}`);
  }
}
