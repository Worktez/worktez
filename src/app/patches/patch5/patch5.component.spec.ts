import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patch5Component } from './patch5.component';

describe('Patch5Component', () => {
  let component: Patch5Component;
  let fixture: ComponentFixture<Patch5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Patch5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Patch5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
