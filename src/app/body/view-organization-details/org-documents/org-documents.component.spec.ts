import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgDocumentsComponent } from './org-documents.component';

describe('OrgDocumentsComponent', () => {
  let component: OrgDocumentsComponent;
  let fixture: ComponentFixture<OrgDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
