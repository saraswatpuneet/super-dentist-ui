import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { PatientStatus } from './patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = `${environment.baseUrl}/patient`;

  constructor(private http: HttpClient) { }

  getAllPatientsForClinic(addressId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/list/${addressId}`);
  }

  getAllPatientsForClinic2(addressId: string, pageSize: number, cursor: string): Observable<any> {
    let url = `${this.baseUrl}/list/${addressId}?pageSize=${pageSize}`;
    if (cursor) {
      url += `&cursor=${cursor}`;
    }

    return this.http.get(url);
  }

  getPatient(patientId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/info/${patientId}`);
  }

  getPatientNotes(patientId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/notes/${patientId}`);
  }

  setPatientNotes(patientId: string, patientData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/notes/${patientId}`, patientData);
  }

  updateStatus(patientId: string, status: PatientStatus): Observable<any> {
    return this.http.post(`${this.baseUrl}/status/${patientId}`, status);
  }

}

