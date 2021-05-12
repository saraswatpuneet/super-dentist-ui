import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceFilterComponent } from './insurance-filter.component';

describe('InsuranceFilterComponent', () => {
  let component: InsuranceFilterComponent;
  let fixture: ComponentFixture<InsuranceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
