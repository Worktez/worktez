import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubLinkComponent } from './github-link.component';

describe('GithubLinkComponent', () => {
  let component: GithubLinkComponent;
  let fixture: ComponentFixture<GithubLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
