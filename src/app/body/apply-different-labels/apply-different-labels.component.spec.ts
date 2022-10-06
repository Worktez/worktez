import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyDifferentLabelsComponent } from './apply-different-labels.component';

describe('ApplyDifferentLabelsComponent', () => {
  let component: ApplyDifferentLabelsComponent;
  let fixture: ComponentFixture<ApplyDifferentLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyDifferentLabelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyDifferentLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
