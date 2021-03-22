import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibleInsuranceFieldsComponent } from './visible-insurance-fields.component';

describe('VisibleInsuranceFieldsComponent', () => {
  let component: VisibleInsuranceFieldsComponent;
  let fixture: ComponentFixture<VisibleInsuranceFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibleInsuranceFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibleInsuranceFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
