import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWatchersComponent } from './add-watchers.component';

describe('AddWatchersComponent', () => {
  let component: AddWatchersComponent;
  let fixture: ComponentFixture<AddWatchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWatchersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWatchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
