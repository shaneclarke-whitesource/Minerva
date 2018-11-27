import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PocApiCallService } from './poc-api-call.service';
import { PocApiCallMockService } from './poc-api-call.service.mock';

describe('PocApiCallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: []
    })
  });

  it('should be created', () => {
    const service: PocApiCallService = TestBed.get(PocApiCallService);
    expect(service).toBeTruthy();
  });

  it('should return data', () => {
    const service: PocApiCallService = TestBed.get(PocApiCallService);
    service.post({}).subscribe((data) => {
      expect(data).toEqual(new PocApiCallMockService().mock);
    });
  })
});
