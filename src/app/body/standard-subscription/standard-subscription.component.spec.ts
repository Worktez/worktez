import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardSubscriptionComponent } from './standard-subscription.component';

describe('StandardSubscriptionComponent', () => {
  let component: StandardSubscriptionComponent;
  let fixture: ComponentFixture<StandardSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
