import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewOrganizationComponent } from './create-new-organization.component';

describe('CreateNewOrganizationComponent', () => {
  let component: CreateNewOrganizationComponent;
  let fixture: ComponentFixture<CreateNewOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewOrganizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
