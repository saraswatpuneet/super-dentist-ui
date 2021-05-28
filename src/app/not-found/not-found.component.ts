import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('SuperDentist - 404');
  }

  goHome(): void {
    this.router.navigate(['']);
  }
}
