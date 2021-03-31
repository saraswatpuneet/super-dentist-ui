import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeInputsComponent } from './code-inputs.component';

describe('CodeInputsComponent', () => {
  let component: CodeInputsComponent;
  let fixture: ComponentFixture<CodeInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
