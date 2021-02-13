import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentMenuComponent } from './treatment-menu.component';

describe('TreatmentMenuComponent', () => {
  let component: TreatmentMenuComponent;
  let fixture: ComponentFixture<TreatmentMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
