import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { DentalBreakDowns } from './insurance';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPracticeCodes(): Observable<DentalBreakDowns> {
    return this.http.get<DentalBreakDowns>(`${this.baseUrl}/insurance/practiceCodes`).pipe(map((d: any) => d.data));
  }
}
