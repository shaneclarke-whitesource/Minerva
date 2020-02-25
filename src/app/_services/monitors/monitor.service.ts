import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../../_services/logging/logging.service';
import { LogLevels } from '../../_enums/log-levels.enum';
import { monitorsMock } from '../../_mocks/monitors/monitors.service.mock'
import { Monitors, Monitor, Schema } from 'src/app/_models/monitors';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private _monitors: Monitors;
  private _monitor: Monitor;

  private _schema: Schema;
  private mockedMonitors = new monitorsMock();

  constructor(private http:HttpClient, private logService: LoggingService) { }

  get monitors(): Monitors {
    return this._monitors;
  }

  set monitors(value: Monitors) {
    this._monitors = value;
  }

  get monitor(): Monitor {
    return this._monitor
  }

  set monitor(value: Monitor) {
    this._monitor = value;
  }

  get schema(): Schema {
    return this._schema;
  }

  set schema(scheme: Schema) {
    this._schema = scheme;
  }
  /**
   * @description Gets a list of monitors
   * @param size number
   * @param page number
   * @returns Observable<Monitors>
   */
  getMonitors(size: number, page: number): Observable<Monitors> {
    if (environment.mock) {
      let mocks = Object.assign({}, this.mockedMonitors.collection);
      let slicedData = [... mocks.content.slice(page * size, (page + 1) * size)];
      this.monitors = mocks;
      this.monitors.content = slicedData
      return of<Monitors>(this.monitors);
    }
    else {
    return this.http.get<Monitors>(`${environment.api.salus}/monitors?size=${size}&page=${page}`, httpOptions)
    .pipe(
      tap(data =>
        { this.monitors = data;
          this.logService.log(this.monitors, LogLevels.info);
        }));
    }
  }

/**
 * @description Gets a single monitor
 * @param id string
 * @returns Observable<Monitor>
 */
  getMonitor(id: string): Observable<Monitor> {
    if (environment.mock) {
      return of<Monitor>(this.mockedMonitors.single);
    }
    else {
      return this.http.get<Monitor>(`${environment.api.salus}/monitors/${id}`, httpOptions)
      .pipe(
        tap(data => {
          this._monitor = data;
          this.logService.log(`Monitor: ${data}`, LogLevels.info);
        })
      );
    }
  }

  createMonitor(param:any): Observable<any> {
    return of();
  }

  updateMonitor(id:number): Observable<any> {
    return of();
  }

  /**
   * @description Deletes a monitor
   * @param id string
   */
  deleteMonitor(id:string): Observable<any> {
    if (environment.mock) {
      return of<boolean>(true);
    }
    else {
      return this.http.delete(`${environment.api.salus}/monitors/${id}`, {observe: 'response'})
      .pipe(
        tap(data => {
          this.logService.log(`Monitor deleted: ${id}`, LogLevels.info);
        })
      );
    }
  }

  /**
   * @desciption Gets the monitor plugins schema
   * @returns Observable<Schema>
   */
  getSchema(): Observable<Schema> {
    if (environment.mock) {
      return of<Schema>(this.mockedMonitors.schema);
    }
    else {
      return this.http.get<Schema>(`${environment.api.salus}/schema/monitor-plugins`)
      .pipe(
        tap(data => {
          this._schema = data;
          this.logService.log(`Schema: ${data}`, LogLevels.info);
        })
      )
    }
  }
}
