import { TestBed } from '@angular/core/testing';

import { FilterTaskService } from './filter-task.service';

describe('FilterTaskService', () => {
  let service: FilterTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
