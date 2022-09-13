import { TestBed } from '@angular/core/testing';

import { RBAService } from './rba.service';

describe('RBAService', () => {
  let service: RBAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RBAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
