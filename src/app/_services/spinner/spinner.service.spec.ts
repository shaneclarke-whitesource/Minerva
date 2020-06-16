import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have isLoading asObservable', () => {
    service.isLoading.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('should changeLoadingStatus', () => {
    service.changeLoadingStatus(true);
    service.isLoading.subscribe((value) => {
      expect(value).toBe(true);
    });
  });

});
