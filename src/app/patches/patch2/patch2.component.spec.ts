import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patch2Component } from './patch2.component';

describe('Patch2Component', () => {
  let component: Patch2Component;
  let fixture: ComponentFixture<Patch2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Patch2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Patch2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
