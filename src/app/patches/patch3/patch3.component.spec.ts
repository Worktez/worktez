import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patch3Component } from './patch3.component';

describe('Patch3Component', () => {
  let component: Patch3Component;
  let fixture: ComponentFixture<Patch3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Patch3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Patch3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
