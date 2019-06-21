import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Resource } from './resource.model';

export interface ResourcesState extends EntityState<Resource> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'resources' })
export class ResourcesStore extends EntityStore<ResourcesState, Resource> {

  constructor() {
    super();
  }

}

