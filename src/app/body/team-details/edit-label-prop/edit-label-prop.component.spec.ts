import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLabelPropComponent } from './edit-label-prop.component';

describe('EditLabelPropComponent', () => {
  let component: EditLabelPropComponent;
  let fixture: ComponentFixture<EditLabelPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLabelPropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLabelPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
