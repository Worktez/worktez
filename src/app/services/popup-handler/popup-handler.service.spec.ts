import { TestBed } from '@angular/core/testing';

import { PopupHandlerService } from './popup-handler.service';

describe('PopupHandlerService', () => {
  let service: PopupHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
