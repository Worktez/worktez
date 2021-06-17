import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCompletionComponent } from './work-completion.component';

describe('WorkCompletionComponent', () => {
  let component: WorkCompletionComponent;
  let fixture: ComponentFixture<WorkCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
