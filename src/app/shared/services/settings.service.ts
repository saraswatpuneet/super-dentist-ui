import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private theme$ = new BehaviorSubject<'light' | 'dark'>('light');

  constructor() { }

  getTheme(): Observable<string> {
    return this.theme$.asObservable();
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.theme$.next(theme);
  }
}
