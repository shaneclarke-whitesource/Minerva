import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MonitorService } from './monitor.service';
import { environment } from '../../../environments/environment';
import { monitorsMock } from '../../_mocks/monitors/monitors.service.mock';

describe('MonitorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: MonitorService = TestBed.get(MonitorService);
    expect(service).toBeTruthy();
  });

  it('should set & get Monitors', () => {
    const service: MonitorService = TestBed.get(MonitorService);
    service.monitors = {type: "legit"};
    expect(service.monitors.type).toEqual("legit");
  });

  describe('CRUD Operations', () => {
    it('should return collection', () => {
      const service: MonitorService  = TestBed.get(MonitorService );
      service.getMonitors(environment.pagination.resources.pageSize, 1).subscribe((data) => {
        let mocked = new monitorsMock().collection;
        let slicedArray = new monitorsMock().collection.content
         .slice(0 * environment.pagination.resources.pageSize, 1 * environment.pagination.resources.pageSize);
        mocked.content = slicedArray
        expect(data).toEqual(mocked);
      });
    });

    it('should return single monitor', () => {
      const service: MonitorService = TestBed.get(MonitorService);
      service.getMonitor(7).subscribe((data) => {
        expect(data).toEqual(new monitorsMock().single);
      });
    });

  });
});
