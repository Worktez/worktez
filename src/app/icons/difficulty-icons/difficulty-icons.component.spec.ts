import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyIconsComponent } from './difficulty-icons.component';

describe('DifficultyIconsComponent', () => {
  let component: DifficultyIconsComponent;
  let fixture: ComponentFixture<DifficultyIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifficultyIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultyIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
