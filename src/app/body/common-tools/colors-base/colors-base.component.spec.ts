import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsBaseComponent } from './colors-base.component';

describe('ColorsBaseComponent', () => {
  let component: ColorsBaseComponent;
  let fixture: ComponentFixture<ColorsBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorsBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
