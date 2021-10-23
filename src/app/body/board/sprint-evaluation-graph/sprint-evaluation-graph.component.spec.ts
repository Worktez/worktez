import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintEvaluationGraphComponent } from './sprint-evaluation-graph.component';

describe('SprintEvaluationGraphComponent', () => {
  let component: SprintEvaluationGraphComponent;
  let fixture: ComponentFixture<SprintEvaluationGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintEvaluationGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintEvaluationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
