import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsBetaComponent } from './referrals-beta.component';

describe('ReferralsBetaComponent', () => {
  let component: ReferralsBetaComponent;
  let fixture: ComponentFixture<ReferralsBetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralsBetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralsBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
