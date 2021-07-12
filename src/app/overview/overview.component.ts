import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import { appColors, globalChartColors } from '../shared/utils/colors';
import { Title } from '@angular/platform-browser';
import { SettingsService } from '../shared/services/settings.service';
import { takeUntil } from 'rxjs/operators';
import { Base } from '../shared/base/base-component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent extends Base implements OnInit {
  cashFlowChart = 'left';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = [];
  theme = '';
  colors = [
    appColors.green,
    appColors.red,
    appColors.xBlue,
    appColors.blue,
    appColors.blueHeader,
    appColors.pastelBlue,
  ];

  constructor(
    private title: Title,
    private settingsService: SettingsService,
  ) { super(); }

  ngOnInit(): void {
    this.title.setTitle('SuperDentist - Overview');
    this.settingsService.getTheme()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(theme => {
        this.theme = `${theme}Theme`;
        this.updateChart();
      });
    this.chartOptions.push(this.initChart());
    this.chartOptions.push(this.initColumnChart());
  }

  private updateChart(): void {
    if (this.chartOptions) {
      for (let x = 0, l = this.chartOptions.length; x < l; x++) {
        this.chartOptions[x] = { ...this.chartOptions[x], ...globalChartColors[this.theme] };
      }
    }
  }

  private initChart(): any {
    return {
      series: [
        {
          name: 'Production',
          data: [5, 3, 4, 7, 2],
          color: appColors.blue,
        },
        {
          name: 'Collections',
          data: [3, 0, 4, 4, 3],
          color: appColors.pastelGreen,
        },
        {
          name: 'Net operating income',
          data: [7, 9, 8, 7, 1],
          color: appColors.orange,
        },
        {
          name: 'Current cash blanace',
          data: [1, 3, 9, 7, 7],
          color: appColors.pastelPink,
        },
      ],
      chart: {
        animation: true,
        backgroundColor: 'transparent',
        // type: 'column',
        resetZoomButton: {
          theme: {
            display: 'none'
          }
        }
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        shared: true,
        followPointer: true
      },
      legend: {
        ...globalChartColors[this.theme].legend,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        backgroundColor: 'transparent',
        enabled: false,
      },
      title: {
        text: '',
        style: {
          color: 'rgb(146, 146, 146)'
        }
      },
      yAxis: {
        ...globalChartColors[this.theme].yAxis,
        title: {
          text: ''
        },
        // stackLabels: {
        //   enabled: false,
        // }
      },
      xAxis: {
        ...globalChartColors[this.theme].xAxis,
        // categories: ['Jan 2020', 'Feb 2020', 'Mar 2020', 'Apr 2020', 'May 2020'],
        // gridLineColor: 'rgba(146, 146, 146, 0.2)',
        title: {
          text: ''
        },
      },
      plotOptions: {
        ...globalChartColors[this.theme].plotOptions,
        series: {
          pointPadding: 0.07,
          maxPointWidth: 40,
          borderWidth: 0,
          // stacking: 'normal',
          shadow: false
        },
      }
    };
  }

  private initColumnChart(): any {
    return {
      series: [
        {
          name: 'Money in',
          data: [5, 3, 4, 7, 2],
          stack: 'male',
          color: appColors.blue,
        }, {
          name: 'Money out',
          data: [3, 0, 4, 4, 3],
          stack: 'female',
          color: appColors.pastelPink,
        },
      ],
      chart: {
        animation: true,
        backgroundColor: 'transparent',
        type: 'column',
        resetZoomButton: {
          theme: {
            display: 'none'
          }
        }
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        shared: true,
        followPointer: true
      },
      legend: {
        ...globalChartColors[this.theme].legend,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        backgroundColor: 'transparent',
        enabled: false,
      },
      title: {
        text: '',
        style: {
          color: 'rgb(146, 146, 146)'
        }
      },
      yAxis: {
        ...globalChartColors[this.theme].yAxis,
        title: {
          text: ''
        },
        stackLabels: {
          enabled: true,
        }
      },
      xAxis: {
        ...globalChartColors[this.theme].xAxis,
        categories: ['Jan 2020', 'Feb 2020'],
        // gridLineColor: 'rgba(146, 146, 146, 0.2)',
        title: {
          text: ''
        },
      },
      plotOptions: {
        ...globalChartColors[this.theme].plotOptions,
        series: {
          pointPadding: 0.07,
          maxPointWidth: 40,
          borderWidth: 0,
          stacking: 'normal',
          shadow: false
        },
        column: {
          stacking: 'normal'
        }
      }
    };
  }

}
