import { TestBed } from '@angular/core/testing';

import { GithubServiceService } from './github-service.service';

describe('GithubServiceService', () => {
  let service: GithubServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
