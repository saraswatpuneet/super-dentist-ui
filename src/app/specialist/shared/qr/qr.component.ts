import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit {
  @Input() clinic: any;
  @Output() cancel = new EventEmitter();
  imageSource = '';

  constructor() { }

  ngOnInit(): void {
    this.imageSource = `data:image/jpeg;base64,${this.clinic.qrCode}`;
  }

}
