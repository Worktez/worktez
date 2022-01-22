import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewNoteComponent } from './addnew-note.component';

describe('AddnewNoteComponent', () => {
  let component: AddnewNoteComponent;
  let fixture: ComponentFixture<AddnewNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
