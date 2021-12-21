import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patch8Component } from './patch8.component';

describe('Patch8Component', () => {
  let component: Patch8Component;
  let fixture: ComponentFixture<Patch8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Patch8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Patch8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
