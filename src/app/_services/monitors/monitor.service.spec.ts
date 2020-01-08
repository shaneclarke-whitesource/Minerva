import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MonitorService } from './monitor.service';
import { environment } from '../../../environments/environment';
import { monitorsMock } from '../../_mocks/monitors/monitors.service.mock';

describe('MonitorService', () => {
  let injector: TestBed;
  let service: MonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        MonitorService
      ]
    });
    injector = getTestBed();
    service = injector.get(MonitorService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set & get Monitors', () => {
    service.monitors = {type: "legit"};
    expect(service.monitors.type).toEqual("legit");
  });

  describe('CRUD Operations', () => {
    it('should return collection', () => {
      service.getMonitors(environment.pagination.pageSize, 0).subscribe((data) => {
        let mocked = new monitorsMock().collection;
        let slicedArray = new monitorsMock().collection.content
         .slice(0 * environment.pagination.pageSize, 1 * environment.pagination.pageSize);
        mocked.content = slicedArray
        expect(data).toEqual(mocked);
      });
    });

    it('should return single monitor', () => {
      service.getMonitor(7).subscribe((data) => {
        expect(data).toEqual(new monitorsMock().single);
      });
    });

  });
});
