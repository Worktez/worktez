import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDashBoardComponent } from './my-dashboard.component';

describe('TaskBoardComponent', () => {
  let component: MyDashBoardComponent;
  let fixture: ComponentFixture<MyDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDashBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
