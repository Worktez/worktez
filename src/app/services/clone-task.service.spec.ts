import { TestBed } from '@angular/core/testing';

import { CloneTaskService } from './clone-task.service';

describe('CloneTaskService', () => {
  let service: CloneTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloneTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
