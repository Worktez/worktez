import { TestBed } from '@angular/core/testing';

import { NativeWindowService } from './native-window.service';

describe('NativeWindowService', () => {
  let service: NativeWindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NativeWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
