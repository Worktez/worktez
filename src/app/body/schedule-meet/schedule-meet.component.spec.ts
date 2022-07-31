import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMeetComponent } from './schedule-meet.component';

describe('ScheduleMeetComponent', () => {
  let component: ScheduleMeetComponent;
  let fixture: ComponentFixture<ScheduleMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleMeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
