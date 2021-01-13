import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NearbyClinicsComponent } from './nearby-clinics.component';

describe('NearbyClinicsComponent', () => {
  let component: NearbyClinicsComponent;
  let fixture: ComponentFixture<NearbyClinicsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyClinicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
