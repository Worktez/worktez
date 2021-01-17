import { TestBed } from '@angular/core/testing';

import { NavbarHolderService } from './navbar-holder.service';

describe('NavbarHolderService', () => {
  let service: NavbarHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
