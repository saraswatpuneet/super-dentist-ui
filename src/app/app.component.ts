import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Base } from './shared/base/base-component';
import { appAnimations } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: appAnimations
})
export class AppComponent extends Base implements OnInit {
  title = 'super-dentist';
  authenticated = false;
  expanded = true;
  expandedKey = 'sdNavExpanded';
  navItems = [
    { path: 'referrals', label: 'Referrals', icon: 'settings' },
    { path: 'specialist', label: 'Specialist', icon: 'settings' }
  ];

  constructor(private auth: AngularFireAuth, private router: Router) { super(); }

  ngOnInit(): void {
    const expanded = localStorage.getItem(this.expandedKey);
    if (expanded === 'false') {
      this.expanded = false;
    }
    this.auth.authState.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      if (res) {
        this.authenticated = true;
      }
    });
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
