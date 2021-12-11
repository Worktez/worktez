import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectsComponent } from './edit-projects.component';

describe('EditProjectsComponent', () => {
  let component: EditProjectsComponent;
  let fixture: ComponentFixture<EditProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
