import {TestBed} from '@angular/core/testing';

import {UserTicketsService} from './user-tickets.service';

describe('UserTicketsService', () => {
  let service: UserTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
