import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ResourcesService } from './resources.service';
import { environment } from '../../../environments/environment';
import { resourcesMock } from '../../_mocks/resources/resources.service.mock';
import { Resources, Resource } from 'src/app/_models/resources';
import { executeInitAndContentHooks } from '@angular/core/src/render3/instructions';

describe('ResourcesService', () => {
  let injector: TestBed;
  let service: ResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [ResourcesService]
    });

    injector = getTestBed();
    service = injector.get(ResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set & get resources', () => {
    service.resources = {
      content: [],
      totalPages: 3,
      totalElements: 6,
      last: true,
      first: true,
      number: 0
    };
    expect(service.resources.last).toEqual(true);
  });


  describe('CRUD Operations', () => {
    it('should return collection', () => {
      service.getResources(environment.pagination.resources.pageSize, 0).subscribe((data) => {
        let mocked = new resourcesMock().collection;
        let slicedArray = new resourcesMock().collection.content
         .slice(0 * environment.pagination.resources.pageSize, 1 * environment.pagination.resources.pageSize);
        mocked.content = slicedArray;
        expect(data).toEqual(mocked);
      });
    });

    it('should return single resource', () => {
      service.getResource("linuxResource").subscribe((data) => {
        expect(data).toEqual(new resourcesMock().single);
      });
    });

    it('should update a single resource metadata or labels', () => {
      let updated = {labels: {'newkey': 'newVal', 'somekey':'someVal'}};
      service.updateResource("linuxResource", updated).subscribe((data:Resource) => {
        expect(data).toEqual(new resourcesMock().single);
      });
    });

    it('should delete a Resource', () => {
      service.deleteResource('resourceID').subscribe((data) => {
        expect(data).toEqual(true);
      });
    });

  });
});
