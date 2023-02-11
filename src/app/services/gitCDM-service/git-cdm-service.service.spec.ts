import { TestBed } from '@angular/core/testing';

import { GitCDMServiceService } from './git-cdm-service.service';

describe('GitCDMServiceService', () => {
  let service: GitCDMServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitCDMServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
