import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNotificationCardComponent } from './all-notification-card.component';

describe('AllNotificationCardComponent', () => {
  let component: AllNotificationCardComponent;
  let fixture: ComponentFixture<AllNotificationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllNotificationCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllNotificationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
