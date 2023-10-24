import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognizeComponent } from './recognize.component';

describe('RecognizeComponent', () => {
  let component: RecognizeComponent;
  let fixture: ComponentFixture<RecognizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecognizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecognizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
