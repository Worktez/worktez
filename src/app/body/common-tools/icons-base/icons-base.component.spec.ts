import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsBaseComponent } from './icons-base.component';

describe('IconsBaseComponent', () => {
  let component: IconsBaseComponent;
  let fixture: ComponentFixture<IconsBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconsBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
