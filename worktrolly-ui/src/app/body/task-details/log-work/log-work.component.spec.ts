import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogWorkComponent } from './log-work.component';

describe('LogWorkComponent', () => {
  let component: LogWorkComponent;
  let fixture: ComponentFixture<LogWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
