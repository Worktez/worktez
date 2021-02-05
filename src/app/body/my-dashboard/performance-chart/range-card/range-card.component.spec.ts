import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeCardComponent } from './range-card.component';

describe('RangeCardComponent', () => {
  let component: RangeCardComponent;
  let fixture: ComponentFixture<RangeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
