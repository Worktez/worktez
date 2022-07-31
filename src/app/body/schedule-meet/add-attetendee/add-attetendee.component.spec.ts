import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttetendeeComponent } from './add-attetendee.component';

describe('AddAttetendeeComponent', () => {
  let component: AddAttetendeeComponent;
  let fixture: ComponentFixture<AddAttetendeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttetendeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAttetendeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
