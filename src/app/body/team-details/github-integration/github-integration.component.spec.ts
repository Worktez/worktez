import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubIntegrationComponent } from './github-integration.component';

describe('GithubIntegrationComponent', () => {
  let component: GithubIntegrationComponent;
  let fixture: ComponentFixture<GithubIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubIntegrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
