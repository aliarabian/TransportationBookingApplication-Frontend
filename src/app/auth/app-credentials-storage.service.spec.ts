import { TestBed } from '@angular/core/testing';

import { AppCredentialsStorageService } from './app-credentials-storage.service';

describe('AppStorageService', () => {
  let service: AppCredentialsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppCredentialsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
