import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinFavoritesComponent } from './join-favorites.component';

describe('JoinFavoritesComponent', () => {
  let component: JoinFavoritesComponent;
  let fixture: ComponentFixture<JoinFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinFavoritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
