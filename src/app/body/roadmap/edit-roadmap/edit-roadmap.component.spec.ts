import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoadmapComponent } from './edit-roadmap.component';

describe('EditRoadmapComponent', () => {
  let component: EditRoadmapComponent;
  let fixture: ComponentFixture<EditRoadmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRoadmapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
