import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patch10Component } from './patch10.component';

describe('Patch10Component', () => {
  let component: Patch10Component;
  let fixture: ComponentFixture<Patch10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Patch10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Patch10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
