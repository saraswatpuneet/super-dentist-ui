import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnChanges {
  @Input() address = '';
  @Input() phoneNumber = '';
  parsedAddress = [];

  constructor() { }

  ngOnChanges(sc: SimpleChanges): void {
    const addressInfo = [];
    if (this.phoneNumber) {
      addressInfo.push(this.phoneNumber);
    }

    if (this.address) {
      try {
        const parsedAddress = this.address.split(',');
        addressInfo.push(parsedAddress[0]);
        addressInfo.push(`${parsedAddress[1]}, ${parsedAddress[2]}`);
      } catch (e) { console.log(e); }
    }

    this.parsedAddress = addressInfo;
  }
}
