import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrganizationDetailsComponent } from './view-organization-details.component';

describe('ViewOrganizationDetailsComponent', () => {
  let component: ViewOrganizationDetailsComponent;
  let fixture: ComponentFixture<ViewOrganizationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrganizationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrganizationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
