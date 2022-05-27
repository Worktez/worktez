import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneCardComponent } from './milestone-card.component';

describe('MilestoneCardComponent', () => {
  let component: MilestoneCardComponent;
  let fixture: ComponentFixture<MilestoneCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilestoneCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
