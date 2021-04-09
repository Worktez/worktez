import { TestBed } from '@angular/core/testing';

import { PeopleSuggestionService } from './people-suggestion.service';

describe('PeopleSuggestionService', () => {
  let service: PeopleSuggestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleSuggestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
