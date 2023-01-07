import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReleaseComponent } from './edit-release.component';

describe('EditReleaseComponent', () => {
  let component: EditReleaseComponent;
  let fixture: ComponentFixture<EditReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReleaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
