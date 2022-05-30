import {TestBed} from '@angular/core/testing';

import {FlightsResolver} from './flights.resolver';

describe('FlightsResolver', () => {
  let resolver: FlightsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FlightsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
