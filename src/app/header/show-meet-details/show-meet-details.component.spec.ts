import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMeetDetailsComponent } from './show-meet-details.component';

describe('ShowMeetDetailsComponent', () => {
  let component: ShowMeetDetailsComponent;
  let fixture: ComponentFixture<ShowMeetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMeetDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMeetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
