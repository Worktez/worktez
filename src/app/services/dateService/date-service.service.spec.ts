import { TestBed } from '@angular/core/testing';

import { DateServiceService } from './date-service.service';

describe('DateServiceService', () => {
  let service: DateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
