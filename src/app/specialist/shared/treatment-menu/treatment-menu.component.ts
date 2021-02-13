import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-treatment-menu',
  templateUrl: './treatment-menu.component.html',
  styleUrls: ['./treatment-menu.component.scss']
})
export class TreatmentMenuComponent implements OnInit {
  @Input() clinic: any;

  constructor() { }

  ngOnInit(): void {
  }

}
