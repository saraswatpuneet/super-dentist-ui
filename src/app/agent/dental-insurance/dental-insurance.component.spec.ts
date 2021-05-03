import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentalInsuranceComponent } from './dental-insurance.component';

describe('DentalInsuranceComponent', () => {
  let component: DentalInsuranceComponent;
  let fixture: ComponentFixture<DentalInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentalInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DentalInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
