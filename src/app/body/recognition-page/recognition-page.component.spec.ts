import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionPageComponent } from './recognition-page.component';

describe('RecognitionPageComponent', () => {
  let component: RecognitionPageComponent;
  let fixture: ComponentFixture<RecognitionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecognitionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecognitionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
