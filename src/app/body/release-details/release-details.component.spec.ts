import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseDetailsComponent } from './release-details.component';

describe('ReleaseDetailsComponent', () => {
  let component: ReleaseDetailsComponent;
  let fixture: ComponentFixture<ReleaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
