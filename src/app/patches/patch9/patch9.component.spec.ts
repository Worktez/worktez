import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patch9Component } from './patch9.component';

describe('Patch9Component', () => {
  let component: Patch9Component;
  let fixture: ComponentFixture<Patch9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Patch9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Patch9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
