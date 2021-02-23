import { Component, OnInit } from '@angular/core';
import { map, takeUntil, switchMap, take, catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import * as Highcharts from 'highcharts';

import { ClinicService } from '../shared/services/clinic.service';
import { ReferralService } from '../shared/services/referral.service';
import { Base } from '../shared/base/base-component';
import { Referral, sortReferredStatus } from '../shared/services/referral';
import { globalChartColors, appColors } from '../shared/utils/colors';
import { SettingsService } from '../shared/services/settings.service';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent extends Base implements OnInit {
  myClinics = [];
  clinicType = '';
  theme = '';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = [];
  statuses = sortReferredStatus().reverse();
  colors = [
    appColors.green,
    appColors.red,
    appColors.xBlue,
    appColors.blue,
    appColors.blueHeader,
    appColors.pastelBlue,
  ];
  // colors = [
  //   '#00bfff',
  //   appColors.red,
  //   '#56aeff',
  //   '#9598ff',
  //   '#c87ce5',
  //   '#ec5bb9',
  // ];

  constructor(
    private clinicService: ClinicService,
    private referralService: ReferralService,
    private settingsService: SettingsService
  ) { super(); }

  ngOnInit(): void {
    this.settingsService.getTheme()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(theme => {
        this.theme = `${theme}Theme`;
        this.updateChart();
      });

    this.clinicService.getClinics().pipe(
      map(d => d.data.clinicDetails),
      switchMap(clinics => {
        const clinicHash = {};
        clinics.forEach(clinic => clinicHash[clinic.addressId] = clinic);
        this.myClinics = Object.values(clinicHash);
        const reqs = [];

        if (clinics[0].type === 'dentist') {
          this.clinicType = 'dentist';
          this.myClinics.forEach(clinic =>
            reqs.push(this.referralService.getDentistRerrals(clinic.addressId).pipe(catchError(() => of([])), take(1)))
          );
        } else {
          this.clinicType = 'specialist';
          this.myClinics.forEach(clinic =>
            reqs.push(this.referralService.getSpecialistReferrals(clinic.addressId).pipe(catchError(() => of([])), take(1)))
          );
        }

        return forkJoin(reqs);
      }),
      takeUntil(this.unsubscribe$))
      .subscribe((res: Referral[][]) => {
        let addressIdKey = 'fromAddressId';
        let clinicNameKey = 'fromClinicName';

        if (this.clinicType === 'dentist') {
          addressIdKey = 'toAddressId';
          clinicNameKey = 'toClinicName';
        }

        res.forEach(r => {
          const mapy = this.referralsCount(r, addressIdKey, clinicNameKey);
          this.chartOptions.push(this.initChart(mapy));
        });
      });
  }

  private referralsCount(referrals: Referral[], addressIdKey: string, clinicNameKey: string): any {
    const mapy = {};
    referrals.forEach(r => {
      if (!r[addressIdKey]) {
        return;
      }
      if (!mapy[r[addressIdKey]]) {
        mapy[r[addressIdKey]] = this.freshStatusCount(r[clinicNameKey]);
      }

      mapy[r[addressIdKey]][r.status.gdStatus]++;
    });

    return mapy;
  }

  private freshStatusCount(clinicName: string): any {
    const emptyStatus = {};
    this.statuses.forEach(s => emptyStatus[s] = 0);
    return { clinicName, ...emptyStatus };
  }

  private updateChart(): void {
    if (this.chartOptions) {
      for (let x = 0, l = this.chartOptions.length; x < l; x++) {
        this.chartOptions[x] = { ...this.chartOptions[x], ...globalChartColors[this.theme] };
      }
    }
  }

  private initChart(mapy: any): any {
    const normalizedKeys = Object.keys(mapy);
    const categories = [];
    const series = [];

    normalizedKeys.forEach(key => {
      categories.push(mapy[key].clinicName);
    });

    this.statuses.forEach((name, i) => {
      const data = normalizedKeys.map(key => mapy[key][name]);
      series.push({ name, data, color: this.colors[i] });
    });

    return {
      series,
      chart: {
        animation: true,
        backgroundColor: 'transparent',
        type: 'bar',
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
      legend: {
        ...globalChartColors[this.theme].legend,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        backgroundColor: 'transparent',
      },
      title: {
        text: 'Referrals ',
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
        categories,
        // gridLineColor: 'rgba(146, 146, 146, 0.2)',
        title: {
          text: ''
        },
      },
      plotOptions: {
        ...globalChartColors[this.theme].plotOptions,
        series: {
          pointPadding: 0.07,
          maxPointWidth: 50,
          // groupPadding: 0,
          borderWidth: 0,
          stacking: 'normal',
          shadow: false
        }
      }
    };
  }
}
