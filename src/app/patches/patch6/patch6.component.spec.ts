import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patch6Component } from './patch6.component';

describe('Patch6Component', () => {
  let component: Patch6Component;
  let fixture: ComponentFixture<Patch6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Patch6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Patch6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
