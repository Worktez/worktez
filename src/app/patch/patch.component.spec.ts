import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchComponent } from './patch.component';

describe('PatchComponent', () => {
  let component: PatchComponent;
  let fixture: ComponentFixture<PatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
