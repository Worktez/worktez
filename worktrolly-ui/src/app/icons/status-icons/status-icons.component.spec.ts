import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusIconsComponent } from './status-icons.component';

describe('StatusIconsComponent', () => {
  let component: StatusIconsComponent;
  let fixture: ComponentFixture<StatusIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
