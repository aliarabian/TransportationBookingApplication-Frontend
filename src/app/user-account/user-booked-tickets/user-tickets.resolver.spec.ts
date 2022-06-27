import {TestBed} from '@angular/core/testing';

import {UserTicketsResolver} from './user-tickets.resolver';

describe('UserTicketsResolver', () => {
  let resolver: UserTicketsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserTicketsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
