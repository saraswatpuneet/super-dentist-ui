import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentInputComponent } from './agent-input.component';

describe('AgentInputComponent', () => {
  let component: AgentInputComponent;
  let fixture: ComponentFixture<AgentInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
