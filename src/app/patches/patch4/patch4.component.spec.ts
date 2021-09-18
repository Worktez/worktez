import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patch4Component } from './patch4.component';

describe('Patch4Component', () => {
  let component: Patch4Component;
  let fixture: ComponentFixture<Patch4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Patch4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Patch4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
