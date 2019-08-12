import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { PortalDataService } from '../portal/portal-data.service';
import { LogLevels } from '../../_enums/log-levels.enum';
import { IMetrics, IMetricField, IMeasurement, IDevices } from 'src/app/_models/metrics';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { LoggingService } from '../../_services/logging/logging.service';
import { metricMocks } from '../../_mocks/metrics/metrics.service.mock';
import { InfluxService } from '../influx/influx.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  sensorSystems: string[] = [];
  private mocks = new metricMocks()
  private readonly db: string = `CORE-${this.portalDataService.portalData.domainId}`;
  private readonly metricsURL:string = environment.api.metrics;

  // metricFields will act as an BehaviorSubject that notes any change in
  // in metricFields
  private metricFields = new BehaviorSubject<IMetricField[] | null>(null);
  metricFields$():Observable<IMetricField[]> {
    return this.metricFields.asObservable();
  }

  // metricMeasurements will act as a BehaviorSubject that notes any change in
  // in measurements
  private metricMeasurements = new BehaviorSubject<IMeasurement[] | null>(null);
  metricMeasurements$():Observable<IMeasurement[]> {
    return this.metricMeasurements.asObservable();
  }

  // metricDevices will act as a BehaviorSubject that notes any change in
  // in devices
  private metricDevices = new BehaviorSubject<IDevices[] | null>(null);
  metricDevices$():Observable<IDevices[]> {
    return this.metricDevices.asObservable();
  }

  // metricDevices will act as a BehaviorSubject that notes any change in
  // in devices
  private metrics = new BehaviorSubject<IMetrics[] | null>(null);
  metrics$():Observable<IMetrics[]> {
    return this.metrics.asObservable();
  }

  constructor(private http:HttpClient, private logService: LoggingService,
    private portalDataService: PortalDataService, private influxService: InfluxService) { }

  getMeasurements(): Observable<IMeasurement[]> {
    const params = {
      db: this.db,
      q: this.influxService.influxShowMeasurements()
    }
    if (environment.mock) {
      let mocks = Object.assign({}, this.mocks.measurements);
      return of(mocks);
    }
    else {
      return this.http.get<IMeasurement[]>(`${this.metricsURL}`, {
        headers: httpOptions.headers,
        params
      })
        .pipe(
          tap(data => {
            this.metricMeasurements.next(data)
            this.logService.log(data, LogLevels.info);
          }));
    }
  }

  getMetricFields(field:string): Observable<IMetricField[]> {
    const params = {
      db: this.db,
      q: this.influxService.influxShowFields(field)
    }
    if (environment.mock) {
      let mocks = Object.assign({}, this.mocks.fields)
      return of(mocks);
    }
    else {
      return this.http.get<IMetricField[]>(`${this.metricsURL}`, {
        headers: httpOptions.headers,
        params
      })
        .pipe(
          tap(data => {
            this.metricFields.next(data)
            this.logService.log(data, LogLevels.info);
          }));
    }
  }

  getDevices(field:string, measurement:string,
    startTime: string, endTime: string): Observable<IDevices[]> {
    const params = {
      db: this.db,
      q: this.influxService.influxDevices(field, measurement, startTime, endTime)
    }
    if (environment.mock) {
      let mocks = Object.assign({}, this.mocks.devices)
      return of(mocks);
    }
    else {
      return this.http.get<IDevices[]>(`${this.metricsURL}`, {
        headers: httpOptions.headers,
        params
      })
        .pipe(
          tap(data => {
            this.metricDevices.next(data)
            this.logService.log(data, LogLevels.info);
          }));
    }
  }


  getMetrics(field:string, measurement:string,
    startTime: string, endTime: string, device: string): Observable<IMetrics[]> {
    const params = {
      db: this.db,
      q: this.influxService.influxMetrics(field, measurement, startTime, endTime, device)
    }
    if (environment.mock) {
      let mocks = Object.assign({}, this.mocks.metrics)
      return of(mocks);
    }
    else {
      return this.http.get<IMetrics[]>(`${this.metricsURL}`, {
        headers: httpOptions.headers,
        params
      })
        .pipe(
          tap(data => {
            this.metrics.next(data)
            this.logService.log(data, LogLevels.info);
          }));
    }
  }


}
