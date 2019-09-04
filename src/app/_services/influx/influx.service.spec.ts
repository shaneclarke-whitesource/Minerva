import { TestBed, getTestBed } from '@angular/core/testing';
import { InfluxService } from './influx.service';

describe('InfluxService', () => {
  let injector: TestBed;
  let service: InfluxService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfluxService]
    })

    injector = getTestBed();
    service = injector.get(InfluxService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return influxShowMeasurements query', () => {
    let query = service.influxShowMeasurements();
    expect(query).toEqual('SHOW MEASUREMENTS LIMIT 100');
  });

  it('should return influxShowFields query', () => {
    let query = service.influxShowFields('MAAS_http');
    expect(query).toEqual('SHOW FIELD KEYS FROM "MAAS_http"');
  });

  it('should return influxDevices query', () => {
    let query = service.influxDevices('http', 'MAAS_http', '6h', 'now()');
    expect(query).toEqual(`SELECT "http", "deviceLabel", "device" FROM "MAAS_http" ` +
    `WHERE time >= now() - 6h`);
  });

  it('should return influxMetrics query', () => {
    let query = service.influxMetrics('http', 'MAAS_http', '6h', 'now()', '588372');
    expect(query).toEqual(`SELECT mean("http") FROM "MAAS_http" ` +
    `WHERE time >= now() - 6h AND device = "588372" ` +
    `GROUP BY time(1m) fill(null)`);
  });
});
