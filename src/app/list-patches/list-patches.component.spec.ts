import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPatchesComponent } from './list-patches.component';

describe('ListPatchesComponent', () => {
  let component: ListPatchesComponent;
  let fixture: ComponentFixture<ListPatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
