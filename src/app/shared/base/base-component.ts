import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-base',
  template: ''
})
export class Base implements OnDestroy {
  unsubscribe$: Observable<void>;
  private unsubscribe = new Subject<void>();

  constructor() {
    this.unsubscribe$ = this.unsubscribe.asObservable();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
