import { TestBed, inject } from '@angular/core/testing';

import { AuthorizeApiService } from './authorize-api.service';

describe('AuthorizeApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizeApiService]
    });
  });

  it('should be created', inject([AuthorizeApiService], (service: AuthorizeApiService) => {
    expect(service).toBeTruthy();
  }));
});
