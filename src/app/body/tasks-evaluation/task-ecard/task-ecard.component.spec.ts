import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskECardComponent } from './task-ecard.component';

describe('TaskECardComponent', () => {
  let component: TaskECardComponent;
  let fixture: ComponentFixture<TaskECardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskECardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskECardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
