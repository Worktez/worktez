import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVerificationComponent } from './user-verification.component';

describe('UserVerificationComponent', () => {
  let component: UserVerificationComponent;
  let fixture: ComponentFixture<UserVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
