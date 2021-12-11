import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEducationComponent } from './edit-education.component';

describe('EditEducationComponent', () => {
  let component: EditEducationComponent;
  let fixture: ComponentFixture<EditEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
