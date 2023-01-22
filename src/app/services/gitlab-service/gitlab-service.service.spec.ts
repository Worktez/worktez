import { TestBed } from '@angular/core/testing';

import { GitlabServiceService } from './gitlab-service.service';

describe('GitlabServiceService', () => {
  let service: GitlabServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitlabServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
