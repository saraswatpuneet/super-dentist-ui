import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReferralSummaryComponent } from './referral-summary.component';

describe('ReferralSummaryComponent', () => {
  let component: ReferralSummaryComponent;
  let fixture: ComponentFixture<ReferralSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
