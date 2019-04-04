import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private _resources: {};

  constructor(private http:HttpClient) { }

  get resources(): any {
    return this._resources;
  }

  set resources(value: any) {
    this._resources = value;
  }

  getResources(): Observable<any> {
    return of();
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
