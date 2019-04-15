import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../../_services/logging/logging.service';
import { LogLevels } from '../../_enums/log-levels.enum';
import { resourcesMock } from '../../_mocks/resources/resources.service.mock'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private _resources: {};
  private collectionMockData = new resourcesMock().collection;

  constructor(private http:HttpClient, private logService: LoggingService) { }

  get resources(): any {
    return this._resources;
  }

  set resources(value: any) {
    this._resources = value;
  }

  getResources(): Observable<any> {
    if (environment.mock) {
      this.resources = this.collectionMockData;
      return of(this.resources);
    }
    else {
    return this.http.get(`${environment.api.salus}/resources`, httpOptions)
    .pipe(
      tap(data =>
        { this.resources = data;
          this.logService.log(this.resources, LogLevels.info);
        }));
    }
  }

  getResource(id: number): Observable<any> {
    return of();
  }

  createResource(param:any): Observable<any> {
    return of();
  }

  updateResource(id:number): Observable<any> {
    return of();
  }

}
