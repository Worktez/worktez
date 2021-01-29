import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionPatchComponent } from './completion-patch.component';

describe('CompletionPatchComponent', () => {
  let component: CompletionPatchComponent;
  let fixture: ComponentFixture<CompletionPatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletionPatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionPatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
