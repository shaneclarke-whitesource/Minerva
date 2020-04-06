import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../../_services/logging/logging.service';
import { LogLevels } from '../../_enums/log-levels.enum';
import { monitorsMock } from '../../_mocks/monitors/monitors.service.mock'
import { IMonitors, IMonitor, ISchema } from 'src/app/_models/monitors';
import { ICreateMonitor } from 'src/app/_models/salus.monitor';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private _monitors: IMonitors;
  private _monitor: IMonitor;

  private _schema: ISchema;
  private mockedMonitors = new monitorsMock();

  constructor(private http:HttpClient, private logService: LoggingService) { }

  get monitors(): IMonitors {
    return this._monitors;
  }

  set monitors(value: IMonitors) {
    this._monitors = value;
  }

  get monitor(): IMonitor {
    return this._monitor
  }

  set monitor(value: IMonitor) {
    this._monitor = value;
  }

  /**
   * @description Gets a list of monitors
   * @param size number
   * @param page number
   * @returns Observable<Monitors>
   */
  getMonitors(size: number, page: number): Observable<IMonitors> {
    if (environment.mock) {
      let mocks = Object.assign({}, this.mockedMonitors.collection);
      let slicedData = [... mocks.content.slice(page * size, (page + 1) * size)];
      this.monitors = mocks;
      this.monitors.content = slicedData
      return of<IMonitors>(this.monitors);
    }
    else {
    return this.http.get<IMonitors>(`${environment.api.salus}/monitors?size=${size}&page=${page}`, httpOptions)
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
  getMonitor(id: string): Observable<IMonitor> {
    if (environment.mock) {
      this._monitor = this.mockedMonitors.single;
      return of<IMonitor>(this.mockedMonitors.single);
    }
    else {
      return this.http.get<IMonitor>(`${environment.api.salus}/monitors/${id}`, httpOptions)
      .pipe(
        tap(data => {
          this._monitor = data;
          this.logService.log(`Monitor: ${data}`, LogLevels.info);
        })
      );
    }
  }

  createMonitor(monitor:ICreateMonitor): Observable<any> {
        if (environment.mock) {
          return of<IMonitor>(this.mockedMonitors.single);
        }
        else {
          return this.http.post(`${environment.api.salus}/monitors`, monitor, httpOptions)
          .pipe(
            tap(data => {
              this.logService.log(`Monitor created: ${data.id}`, LogLevels.info);
            })
          );
        }
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
}
