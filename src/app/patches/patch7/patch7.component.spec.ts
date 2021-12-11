import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patch7Component } from './patch7.component';

describe('Patch7Component', () => {
  let component: Patch7Component;
  let fixture: ComponentFixture<Patch7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Patch7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Patch7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
