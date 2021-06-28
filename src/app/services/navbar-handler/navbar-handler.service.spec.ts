import { TestBed } from '@angular/core/testing';

import { NavbarHandlerService } from './navbar-handler.service';

describe('NavbarHandlerService', () => {
  let service: NavbarHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
