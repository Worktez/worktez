import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReleaseComponent } from './add-release.component';

describe('AddReleaseComponent', () => {
  let component: AddReleaseComponent;
  let fixture: ComponentFixture<AddReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReleaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
