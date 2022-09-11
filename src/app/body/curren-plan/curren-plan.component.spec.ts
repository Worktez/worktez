import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenPlanComponent } from './curren-plan.component';

describe('CurrenPlanComponent', () => {
  let component: CurrenPlanComponent;
  let fixture: ComponentFixture<CurrenPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrenPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrenPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
