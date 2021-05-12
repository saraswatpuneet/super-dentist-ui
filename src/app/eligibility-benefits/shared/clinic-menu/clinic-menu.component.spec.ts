import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicMenuComponent } from './clinic-menu.component';

describe('ClinicMenuComponent', () => {
  let component: ClinicMenuComponent;
  let fixture: ComponentFixture<ClinicMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
