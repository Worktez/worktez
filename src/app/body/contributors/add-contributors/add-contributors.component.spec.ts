import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContributorsComponent } from './add-contributors.component';

describe('AddContributorsComponent', () => {
  let component: AddContributorsComponent;
  let fixture: ComponentFixture<AddContributorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContributorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
