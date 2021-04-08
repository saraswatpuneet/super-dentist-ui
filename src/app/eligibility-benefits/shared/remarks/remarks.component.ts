import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.scss']
})
export class RemarksComponent implements OnInit {
  @Input() remarks = {};

  constructor() { }

  ngOnInit(): void {
  }

}
