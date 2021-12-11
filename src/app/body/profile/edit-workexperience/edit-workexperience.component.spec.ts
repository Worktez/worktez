import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkexperienceComponent } from './edit-workexperience.component';

describe('EditWorkexperienceComponent', () => {
  let component: EditWorkexperienceComponent;
  let fixture: ComponentFixture<EditWorkexperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkexperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkexperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
