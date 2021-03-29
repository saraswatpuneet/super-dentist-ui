import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToothHistoryComponent } from './tooth-history.component';

describe('ToothHistoryComponent', () => {
  let component: ToothHistoryComponent;
  let fixture: ComponentFixture<ToothHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToothHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToothHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
