import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCompletionComponent } from './insurance-completion.component';

describe('InsuranceCompletionComponent', () => {
  let component: InsuranceCompletionComponent;
  let fixture: ComponentFixture<InsuranceCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceCompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
