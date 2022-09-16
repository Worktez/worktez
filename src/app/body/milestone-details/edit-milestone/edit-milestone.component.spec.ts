import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMilestoneComponent } from './edit-milestone.component';

describe('EditMilestoneComponent', () => {
  let component: EditMilestoneComponent;
  let fixture: ComponentFixture<EditMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMilestoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
