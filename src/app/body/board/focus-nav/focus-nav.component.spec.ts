import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusNavComponent } from './focus-nav.component';

describe('FocusNavComponent', () => {
  let component: FocusNavComponent;
  let fixture: ComponentFixture<FocusNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FocusNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
