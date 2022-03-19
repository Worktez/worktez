import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBurndownChartComponent } from './sprint-burndown-chart.component';

describe('SprintBurndownChartComponent', () => {
  let component: SprintBurndownChartComponent;
  let fixture: ComponentFixture<SprintBurndownChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintBurndownChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBurndownChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
