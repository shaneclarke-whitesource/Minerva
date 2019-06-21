import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ResourcesStore, ResourcesState } from './resources.store';
import { Resource } from './resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourcesQuery extends QueryEntity<ResourcesState, Resource> {

  constructor(protected store: ResourcesStore) {
    super(store);
  }

}
