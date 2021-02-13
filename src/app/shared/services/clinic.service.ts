import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { ClinicDetail, DoctorDetail, ClinicServicesOffered } from './clinic';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Socket,io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ClinicService implements OnInit  {
  private baseUrl = `${environment.baseUrl}/clinic`;
  private myClinics$ = new BehaviorSubject<any>(null);
  private socket: WebSocket;
  public data: any;
  private listener: EventEmitter<any> = new EventEmitter();
  public messages: Array<any>;

  constructor(private http: HttpClient) { 
    // call socket with address and raw token without Bearer
    this.socket =  new WebSocket("wss://dev.superdentist.io/api/sd/v1/clinic/queryAddress","eyJhbGciOiJSUzI1NiIsImtpZCI6IjYxMDgzMDRiYWRmNDc1MWIyMWUwNDQwNTQyMDZhNDFkOGZmMWNiYTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3VwZXJkZW50aXN0IiwiYXVkIjoic3VwZXJkZW50aXN0IiwiYXV0aF90aW1lIjoxNjEzMjQ2NDY5LCJ1c2VyX2lkIjoiMUhRSU4zRGNLcGFqYWVaczVrVmRxaXpiY0dyMiIsInN1YiI6IjFIUUlOM0RjS3BhamFlWnM1a1ZkcWl6YmNHcjIiLCJpYXQiOjE2MTMyNDY0NjksImV4cCI6MTYxMzI1MDA2OSwiZW1haWwiOiJwdW5lZXRAc3VwZXJkZW50aXN0LmlvIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsicHVuZWV0QHN1cGVyZGVudGlzdC5pbyJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.PzcpqS5jK7QO-PSqEQNX2lHRjxHVHNTr9nD1u79MxZd13sG8NKwi0aaTr8yGGbIVkisVVaVUIfDLgmVlyzsBbbIZoIuChBETVgwFSfzY1YnosDn-DUAtMVyPVf2BrGEpTti7g6s8Zv3SMBV-2-kJr7-KY3v2reBOiAtsqIhZh-xZU0Td_ANSovewBHYn2aHgrIHkYxbiPPdWBLhbS40Z3072jOcPaWFG9_qezrWT5LiXdQGxUyhBOC9kMt792HNjPkkqP6QhP4XhiA7PjPA9699uLdI2wMn91k9-elgGD_1P7f7WV87F1pMbxn03VBeTDJCwWR0Rhxm7LwBSsHQGAA")
    this.socket.onopen = event => {
      this.listener.emit({"type": "open", "data": event});
  }
  this.socket.onclose = event => {
      this.listener.emit({"type": "close", "data": event});
  }
  this.socket.onmessage = event => {
      this.listener.emit({"type": "message", "data": JSON.parse(event.data)});
  }
  this.getEventListener().subscribe(event => {
    if(event.type == "message") {
      // print incoming message from socket
        let data = event.data;
        console.log(data)
        this.messages.push(data);
    }
    if(event.type == "close") {
    }
    if(event.type == "open") {
    }
});
// this is just sending a string to socket after 10 seconds and 
setTimeout(this.send, 10000, "Signature Smiles Houston", this.socket)

}
public send(data: string, socket: any) {
  socket.send(data);
  }
  public ngOnInit(): void {

}

public close() {

}

public getEventListener() {
    return this.listener;
}
  setMyClinics(clinics: any): void {
    this.myClinics$.next(clinics);
  }

  getMyClinics(): Observable<any> {
    return this.myClinics$.asObservable().pipe(filter(c => !!c));
  }

  getDoctor(clinicAddressId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${clinicAddressId}`);
  }

  getAllDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllDoctors`);
  }

  getClinics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getClinics`);
  }

  getNearbyClinics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getNearbyClinics`);
  }

  getNearbySpecialists(addressId: string, specialties: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/getNearbySpecialists`, {
      addressId,
      specialties,
    });
  }

  getNearbySpecialistsSocket(addressId: string, specialties: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/getNearbySpecialists`, {
      addressId,
      specialties,
    });
  }

  directJoin(secureKey: string, placeIds: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/directJoin?secureKey=${secureKey}&places={"placeIds":${JSON.stringify(placeIds)}}`, null);
  }

  getAddress(address: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAddressList?searchText=${address}`);
    // this needs to implement a websocket of some kind.
  }

  addFavoriteClinics(addressId: string, placeIds: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/addFavorites/${addressId}`, { placeIds });
  }

  getFavoriteClinics(addressId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getFavorites/${addressId}`);
  }

  removeFavoriteClinics(addressId: string, placeIds: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/removeFavorites/${addressId}`, { placeIds });
  }

  getNetworkFavorites(addressId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getNetwork/${addressId}`);
  }

  registerAdmin(email: string, verified: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerAdmin`, { emailId: email, isVerified: verified });
  }

  verifyAdmin(verified: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/verifyAdmin`, { isVerified: verified });
  }

  addClinic(clinics: ClinicDetail[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/addClinics`, { clinicDetails: clinics });
  }

  registerDoctors(doctorDetails: DoctorDetail[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerDoctors`, { doctorDetails });
  }

  registerPMS(pmsNames: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerPMS`, { pmsNames });
  }

  registerServices(services: ClinicServicesOffered[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerServices`, { services });
  }
}
