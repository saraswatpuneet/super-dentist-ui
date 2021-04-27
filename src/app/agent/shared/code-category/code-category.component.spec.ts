import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeCategoryComponent } from './code-category.component';

describe('CodeCategoryComponent', () => {
  let component: CodeCategoryComponent;
  let fixture: ComponentFixture<CodeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
