import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersAccessComponent } from './members-access.component';

describe('MembersAccessComponent', () => {
  let component: MembersAccessComponent;
  let fixture: ComponentFixture<MembersAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
