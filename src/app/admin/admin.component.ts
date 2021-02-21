import { Component, OnInit } from '@angular/core';
import { Options } from 'highcharts';
import { webSocket } from 'rxjs/webSocket';
import { delay, concatMap, takeUntil } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';

import { Base } from '../shared/base/base-component';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends Base implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  chartOptions: any;
  subject = webSocket('wss://ws.coincap.io/prices?assets=bitcoin');

  constructor() { super(); }

  ngOnInit(): void {

  }
  // ngOnInit(): void {
  //   this.subject.pipe(
  //     concatMap(item => of(item).pipe(delay(1000))),
  //     takeUntil(this.unsubscribe$),
  //   ).subscribe((data: any) => {
  //     if (this.chardata && this.chardata.length > 100) {
  //       this.chardata.shift();
  //       this.chardata.push([Date.now(), Number(data.bitcoin)]);
  //     } else {
  //       this.chardata.push([Date.now(), Number(data.bitcoin)]);
  //     }

  //     this.chartOptions = {
  //       series: [{
  //         data: this.chardata,
  //       }],
  //       chart: {
  //         animation: true,
  //         backgroundColor: 'transparent',
  //         type: 'line',
  //         zoomType: 'x',
  //         resetZoomButton: {
  //           theme: {
  //             display: 'none'
  //           }
  //         }
  //       },
  //       credits: {
  //         enabled: false
  //       },
  //       exporting: {
  //         enabled: false
  //       },
  //       legend: {
  //         enabled: false
  //       },
  //       title: {
  //         text: 'Real Time ',
  //         style: {
  //           color: 'rgb(146, 146, 146)'
  //         }
  //       },
  //       yAxis: {
  //         gridLineColor: 'rgba(146, 146, 146, 0.2)',
  //       },
  //       xAxis: {
  //         type: 'datetime',
  //         gridLineColor: 'rgba(146, 146, 146, 0.2)',
  //         title: {
  //           text: 'Time'
  //         },
  //       }
  //     };
  //   });
  // }
}
