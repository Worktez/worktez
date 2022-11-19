import { TestBed } from '@angular/core/testing';

import { SocialPageServiceService } from './social-page-service.service';

describe('SocialPageServiceService', () => {
  let service: SocialPageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialPageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
