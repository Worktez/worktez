import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLogoComponent } from './upload-logo.component';

describe('UploadLogoComponent', () => {
  let component: UploadLogoComponent;
  let fixture: ComponentFixture<UploadLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
