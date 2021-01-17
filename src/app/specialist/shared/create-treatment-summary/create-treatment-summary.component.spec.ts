import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTreatmentSummaryComponent } from './create-treatment-summary.component';

describe('CreateTreatmentSummaryComponent', () => {
  let component: CreateTreatmentSummaryComponent;
  let fixture: ComponentFixture<CreateTreatmentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTreatmentSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTreatmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
