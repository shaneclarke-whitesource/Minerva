import { TestBed } from '@angular/core/testing';

import { PocApiCallService } from './poc-api-call.service';

describe('PocApiCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PocApiCallService = TestBed.get(PocApiCallService);
    expect(service).toBeTruthy();
  });
});
