import { TestBed } from '@angular/core/testing';

import { OrgTeamService } from './org-team.service';

describe('OrgTeamService', () => {
  let service: OrgTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
