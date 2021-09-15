import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatchComponent } from './edit-patch.component';

describe('EditPatchComponent', () => {
  let component: EditPatchComponent;
  let fixture: ComponentFixture<EditPatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
