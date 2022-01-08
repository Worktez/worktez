import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePicComponent } from './edit-profile-pic.component';

describe('EditProfilePicComponent', () => {
  let component: EditProfilePicComponent;
  let fixture: ComponentFixture<EditProfilePicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfilePicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
