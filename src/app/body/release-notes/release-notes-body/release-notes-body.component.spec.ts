import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseNotesBodyComponent } from './release-notes-body.component';

describe('ReleaseNotesBodyComponent', () => {
  let component: ReleaseNotesBodyComponent;
  let fixture: ComponentFixture<ReleaseNotesBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseNotesBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseNotesBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
