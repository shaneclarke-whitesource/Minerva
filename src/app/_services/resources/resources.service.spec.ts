import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ResourcesService } from './resources.service';
import { environment } from '../../../environments/environment';
import { resourcesMock } from '../../_mocks/resources/resources.service.mock';

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


  describe('CRUD Operations', () => {
    it('should return collection', () => {
      const service: ResourcesService = TestBed.get(ResourcesService);
      service.getResources(environment.pagination.resources.pageSize, 1).subscribe((data) => {
        let mocked = new resourcesMock().collection;
        let slicedArray = new resourcesMock().collection.content
         .slice(0 * environment.pagination.resources.pageSize, 1 * environment.pagination.resources.pageSize);
        mocked.content = slicedArray
        expect(data).toEqual(mocked);
      });
    });

    it('should return single resource', () => {
      const service: ResourcesService = TestBed.get(ResourcesService);
      service.getResource(5).subscribe((data) => {
        expect(data).toEqual(new resourcesMock().single);
      });
    });
  });
});
