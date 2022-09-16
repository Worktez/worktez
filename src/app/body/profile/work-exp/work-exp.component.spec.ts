import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkEXPComponent } from './work-exp.component';

describe('WorkEXPComponent', () => {
  let component: WorkEXPComponent;
  let fixture: ComponentFixture<WorkEXPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkEXPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkEXPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
