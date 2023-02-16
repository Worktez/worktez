import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitLinkComponent } from './git-link.component';

describe('GitLinkComponent', () => {
  let component: GitLinkComponent;
  let fixture: ComponentFixture<GitLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
