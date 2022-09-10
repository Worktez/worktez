import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneComponent } from './milestone.component';

describe('MilestoneComponent', () => {
  let component: MilestoneComponent;
  let fixture: ComponentFixture<MilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilestoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
