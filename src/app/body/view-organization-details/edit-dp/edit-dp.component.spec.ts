import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDpComponent } from './edit-dp.component';

describe('EditDpComponent', () => {
  let component: EditDpComponent;
  let fixture: ComponentFixture<EditDpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
