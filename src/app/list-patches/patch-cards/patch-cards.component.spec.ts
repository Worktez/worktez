import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchCardsComponent } from './patch-cards.component';

describe('PatchCardsComponent', () => {
  let component: PatchCardsComponent;
  let fixture: ComponentFixture<PatchCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatchCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
