import { TestBed } from '@angular/core/testing';

import { StartServiceService } from './start-service.service';

describe('StartServiceService', () => {
  let service: StartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
