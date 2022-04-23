import { TestBed } from '@angular/core/testing';

import { QuickNotesService } from './quick-notes.service';

describe('QuickNotesService', () => {
  let service: QuickNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
