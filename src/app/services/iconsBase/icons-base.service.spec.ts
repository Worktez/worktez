import { TestBed } from '@angular/core/testing';

import { IconsBaseService } from './icons-base.service';

describe('IconsBaseService', () => {
  let service: IconsBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconsBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
