import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HCalenderComponent } from './h-calender.component';

describe('HCalenderComponent', () => {
  let component: HCalenderComponent;
  let fixture: ComponentFixture<HCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
