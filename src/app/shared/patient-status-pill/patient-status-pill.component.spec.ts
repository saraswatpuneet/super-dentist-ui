import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientStatusPillComponent } from './patient-status-pill.component';

describe('PatientStatusPillComponent', () => {
  let component: PatientStatusPillComponent;
  let fixture: ComponentFixture<PatientStatusPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientStatusPillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientStatusPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
