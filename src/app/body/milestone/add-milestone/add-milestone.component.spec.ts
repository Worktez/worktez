import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMilestoneComponent } from './add-milestone.component';

describe('AddMilestoneComponent', () => {
  let component: AddMilestoneComponent;
  let fixture: ComponentFixture<AddMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMilestoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
