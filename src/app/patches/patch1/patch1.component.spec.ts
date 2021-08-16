import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patch1Component } from './patch1.component';

describe('Patch1Component', () => {
  let component: Patch1Component;
  let fixture: ComponentFixture<Patch1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Patch1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Patch1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
