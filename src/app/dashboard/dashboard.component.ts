import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    window.location.href = "https://landing.superdentist.io";
  }
  join(): void {
    this.router.navigate(['join']);
  }

  login(): void {
    this.router.navigate(['login']);
  }


}
