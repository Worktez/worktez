import { TestBed } from '@angular/core/testing';

import { ColorBaseService } from './color-base.service';

describe('ColorBaseService', () => {
  let service: ColorBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
