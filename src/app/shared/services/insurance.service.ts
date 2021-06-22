import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { DentalBreakDowns } from './insurance';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private baseUrl = environment.baseUrl;
  private cache: any = {};
  private insuranceList = 'insruanceList';

  constructor(private http: HttpClient) { }

  clearCache(): void {
    this.cache = {};
  }

  getPracticeCodes(): Observable<DentalBreakDowns> {
    if (this.cache[this.insuranceList]) {
      return this.cache[this.insuranceList];
    }
    return this.cache[this.insuranceList] = this.http.get<DentalBreakDowns>(`${this.baseUrl}/insurance/practiceCodes`)
      .pipe(map((d: any) => d.data),
        shareReplay(1),
        catchError(err => {
          console.error(err);
          delete this.cache[this.insuranceList];
          return EMPTY;
        })
      );
  }

  getDentalInsurance(): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient/listInsurance`);
  }
}
