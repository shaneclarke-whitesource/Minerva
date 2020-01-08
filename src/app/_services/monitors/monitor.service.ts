import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../../_services/logging/logging.service';
import { LogLevels } from '../../_enums/log-levels.enum';
import { monitorsMock } from '../../_mocks/monitors/monitors.service.mock'
import { Monitors } from 'src/app/_models/monitors';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private _monitors: {};
  private mockedMonitors = new monitorsMock();

  constructor(private http:HttpClient, private logService: LoggingService) { }

  get monitors(): any {
    return this._monitors;
  }

  set monitors(value: any) {
    this._monitors = value;
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


  getMonitor(id: number): Observable<any> {
    if (environment.mock) {
      return of(this.mockedMonitors.single);
    }
    else {
      return this.http.get(`${environment.api.salus}/monitors/${id}`, httpOptions)
      .pipe(
        tap(data => {
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

  deleteMonitor(id:number): Observable<any> {
    return of();
  }
}
