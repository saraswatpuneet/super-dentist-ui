import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityBenefitsComponent } from './eligibility-benefits.component';

describe('EligibilityBenefitsComponent', () => {
  let component: EligibilityBenefitsComponent;
  let fixture: ComponentFixture<EligibilityBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EligibilityBenefitsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
