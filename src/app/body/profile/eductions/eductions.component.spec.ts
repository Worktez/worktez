import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EductionsComponent } from './eductions.component';

describe('EductionsComponent', () => {
  let component: EductionsComponent;
  let fixture: ComponentFixture<EductionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EductionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
