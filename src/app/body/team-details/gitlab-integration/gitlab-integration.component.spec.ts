import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitlabIntegrationComponent } from './gitlab-integration.component';

describe('GitlabIntegrationComponent', () => {
  let component: GitlabIntegrationComponent;
  let fixture: ComponentFixture<GitlabIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitlabIntegrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitlabIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
