import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgDpComponent } from './org-dp.component';

describe('OrgDpComponent', () => {
  let component: OrgDpComponent;
  let fixture: ComponentFixture<OrgDpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgDpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
