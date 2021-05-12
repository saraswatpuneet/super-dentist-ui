import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-clinic-menu',
  templateUrl: './clinic-menu.component.html',
  styleUrls: ['./clinic-menu.component.scss']
})
export class ClinicMenuComponent implements OnInit {
  @Input() clinics = [];
  @Output() changeClinic = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
