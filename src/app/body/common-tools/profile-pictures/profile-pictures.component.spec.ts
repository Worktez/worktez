import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePicturesComponent } from './profile-pictures.component';

describe('ProfilePicturesComponent', () => {
  let component: ProfilePicturesComponent;
  let fixture: ComponentFixture<ProfilePicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePicturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
