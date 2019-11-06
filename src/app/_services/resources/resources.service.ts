import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../../_services/logging/logging.service';
import { LogLevels } from '../../_enums/log-levels.enum';
import { resourcesMock } from '../../_mocks/resources/resources.service.mock';
import { Resource, Resources } from '../../_models/resources';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private _resources: Resources;
  private mockedResources = new resourcesMock();

  constructor(private http:HttpClient, private logService: LoggingService) { }

  get resources(): Resources {
    return this._resources;
  }

  set resources(value: Resources) {
    this._resources = value;
  }

  getResources(size: number, page: number): Observable<Resources> {
    if (environment.mock) {
      let mocks = Object.assign({}, this.mockedResources.collection);
      let slicedData = [... mocks.content.slice(page * size, (page + 1) * size)];
      this.resources = mocks;
      this.resources.content = slicedData;
      return of<Resources>(this.resources);
    }
    else {
    return this.http.get<Resources>(`${environment.api.salus}/resources?size=${size}&page=${page}`, httpOptions)
    .pipe(
      tap(data =>
        { this.resources = data;
          this.logService.log(this.resources, LogLevels.info);
        }));
    }
  }

  // TODO: establish interface for return data of individual
  // resources
  getResource(id: string): Observable<Resource> {
    if (environment.mock) {
      return of<Resource>(this.mockedResources.single);
    }
    else {
      return this.http.get<Resource>(`${environment.api.salus}/resources/${id}`)
      .pipe(
        tap(data => {
          this.logService.log(`Resource: ${data}`, LogLevels.info);
        })
      );
    }
  }

  createResource(param:any): Observable<any> {
    return of();
  }

  updateResource(id:number): Observable<any> {
    return of();
  }

}
