import { TestBed } from '@angular/core/testing';

import { MilestoneServiceService } from './milestone-service.service';

describe('MilestoneServiceService', () => {
  let service: MilestoneServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilestoneServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
