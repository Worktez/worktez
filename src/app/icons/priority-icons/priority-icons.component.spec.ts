import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityIconsComponent } from './priority-icons.component';

describe('PriorityIconsComponent', () => {
  let component: PriorityIconsComponent;
  let fixture: ComponentFixture<PriorityIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorityIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
