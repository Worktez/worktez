import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintDetailsComponent } from './sprint-details.component';

describe('SprintDetailsComponent', () => {
  let component: SprintDetailsComponent;
  let fixture: ComponentFixture<SprintDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
