import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksEvaluationComponent } from './tasks-evaluation.component';

describe('TasksEvaluationComponent', () => {
  let component: TasksEvaluationComponent;
  let fixture: ComponentFixture<TasksEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
