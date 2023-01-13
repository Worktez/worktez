import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitlabComponent } from './gitlab.component';

describe('GitlabComponent', () => {
  let component: GitlabComponent;
  let fixture: ComponentFixture<GitlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitlabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
