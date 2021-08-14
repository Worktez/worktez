import { TestBed } from '@angular/core/testing';

import { PatchService } from './patch.service';

describe('PatchService', () => {
  let service: PatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
