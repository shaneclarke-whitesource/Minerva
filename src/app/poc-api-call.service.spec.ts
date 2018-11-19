import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PocApiCallService } from './poc-api-call.service';

describe('PocApiCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: PocApiCallService = TestBed.get(PocApiCallService);
    expect(service).toBeTruthy();
  });
});
