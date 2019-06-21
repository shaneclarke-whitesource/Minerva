import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { ResourcesMock } from '../../../_mocks/resources/resources.service.mock';
import { ResourcesStore } from './resources.store';
import { Resource } from './resource.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResourcesService {

  constructor(private resourcesStore: ResourcesStore,
              private http: HttpClient) {
  }

  get() {
    const mockResources = new ResourcesMock().collection.content;
    this.resourcesStore.set(mockResources);
    return new ResourcesMock().collection;
    // TODO: Fetch resources
    // return this.http.get('https://api.com').pipe(tap(resources => {
    //   this.resourcesStore.set(resources);
    // }));
  }

  add(resource: Resource) {
    this.resourcesStore.add(resource);
  }

  update(id, resource: Partial<Resource>) {
    this.resourcesStore.update(id, resource);
  }

  remove(id: ID) {
    this.resourcesStore.remove(id);
  }
}
