import { TestBed } from '@angular/core/testing';

import { ApplicationSettingsService } from './application-settings.service';

describe('ApplicationSettingsService', () => {
  let service: ApplicationSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
