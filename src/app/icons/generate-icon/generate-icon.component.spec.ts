import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateIconComponent } from './generate-icon.component';

describe('GenerateIconComponent', () => {
  let component: GenerateIconComponent;
  let fixture: ComponentFixture<GenerateIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
