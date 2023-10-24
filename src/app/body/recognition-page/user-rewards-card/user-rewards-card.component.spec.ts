import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRewardsCardComponent } from './user-rewards-card.component';

describe('UserRewardsCardComponent', () => {
  let component: UserRewardsCardComponent;
  let fixture: ComponentFixture<UserRewardsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRewardsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRewardsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
