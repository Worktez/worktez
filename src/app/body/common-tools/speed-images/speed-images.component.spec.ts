import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedImagesComponent } from './speed-images.component';

describe('SpeedImagesComponent', () => {
  let component: SpeedImagesComponent;
  let fixture: ComponentFixture<SpeedImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeedImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
