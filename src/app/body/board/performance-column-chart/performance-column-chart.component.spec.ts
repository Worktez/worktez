import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceColumnChartComponent } from './performance-column-chart.component';

describe('PerformanceColumnChartComponent', () => {
  let component: PerformanceColumnChartComponent;
  let fixture: ComponentFixture<PerformanceColumnChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceColumnChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
