import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSprintComponent } from './create-new-sprint.component';

describe('CreateNewSprintComponent', () => {
  let component: CreateNewSprintComponent;
  let fixture: ComponentFixture<CreateNewSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewSprintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
