import { TestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('ErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorService = TestBed.get(ErrorService);
    expect(service).toBeTruthy();
  });

  it('should execute getClientErrorService', () => {
    const service: ErrorService = TestBed.get(ErrorService);
    const error = new Error('basic Error');
    expect(service.getClientErrorMessage(error)).toEqual('basic Error');
  });

  it('should execute getServerErrorMessage', () => {
    const service: ErrorService = TestBed.get(ErrorService);
    const error = new HttpErrorResponse({
        error: 'server Error',
        status: 500,
        statusText: 'bad status',
        url: 'http://wiki.stuff/something'
    });
    expect(service.getServerErrorMessage(error)).toEqual(
        'Http failure response for http://wiki.stuff/something: 500 bad status'
    );
  });
});
