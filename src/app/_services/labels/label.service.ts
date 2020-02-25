import { Injectable } from '@angular/core';
import { LoggingService } from '../logging/logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogLevels } from 'src/app/_enums/log-levels.enum';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private _labels;

  get labels() {
    return this._labels;
  }

  set labels(value: any) {
    this._labels = value;
  }

  constructor(private http:HttpClient, private logService: LoggingService) { }

  /**
   * @description Get all labels attached to all Resources
   * @returns Observable {}
   */
  getResourceLabels() {
    if (environment.mock) {
      return of({});
    }
    else {
      return this.http.get(`${environment.api.salus}/resource-labels`, httpOptions)
      .pipe(
        tap(data => {
          this.labels = data;
          this.logService.log(this.labels, LogLevels.info);
        })
      )
    }
  }

/**
 * @description Get all labels attached to all monitors
 * @returns Observable {}
 */
  getMonitorLabels() {
    if (environment.mock) {
      return of({});
    }
    else {
      return this.http.get(`${environment.api.salus}/resource-labels`, httpOptions)
      .pipe(
        tap(data => {
          this.logService.log(data, LogLevels.info)
        })
      )
    }
  }
}
