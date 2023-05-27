import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoadmapComponent } from './add-roadmap.component';

describe('AddRoadmapComponent', () => {
  let component: AddRoadmapComponent;
  let fixture: ComponentFixture<AddRoadmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoadmapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
