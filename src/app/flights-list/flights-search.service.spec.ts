import {TestBed} from '@angular/core/testing';

import {FlightsSearchService} from './flights-search.service';

describe('FlightsSearchService', () => {
  let service: FlightsSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightsSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
