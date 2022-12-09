import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGitIssueComponent } from './create-git-issue.component';

describe('CreateGitIssueComponent', () => {
  let component: CreateGitIssueComponent;
  let fixture: ComponentFixture<CreateGitIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGitIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGitIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
