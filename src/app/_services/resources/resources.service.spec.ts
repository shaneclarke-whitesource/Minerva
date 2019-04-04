import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ResourcesService } from './resources.service';

describe('ResourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: []
    })
  });

  it('should be created', () => {
    const service: ResourcesService = TestBed.get(ResourcesService);
    expect(service).toBeTruthy();
  });

  it('should set & get resources', () => {
    const service: ResourcesService = TestBed.get(ResourcesService);
    service.resources = {type: "legit"};
    expect(service.resources.type).toEqual("legit");
  });
});
