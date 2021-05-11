import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clinic-menu',
  templateUrl: './clinic-menu.component.html',
  styleUrls: ['./clinic-menu.component.scss']
})
export class ClinicMenuComponent implements OnInit {
  @Input() clinics = [];

  constructor() { }

  ngOnInit(): void {
  }

}
