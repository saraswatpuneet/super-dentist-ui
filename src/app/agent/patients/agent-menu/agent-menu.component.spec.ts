import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMenuComponent } from './agent-menu.component';

describe('AgentMenuComponent', () => {
  let component: AgentMenuComponent;
  let fixture: ComponentFixture<AgentMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
