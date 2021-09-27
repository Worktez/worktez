import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatchComponent } from './add-patch.component';

describe('AddPatchComponent', () => {
  let component: AddPatchComponent;
  let fixture: ComponentFixture<AddPatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
