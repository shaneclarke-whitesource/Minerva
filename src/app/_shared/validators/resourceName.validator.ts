import { ResourcesService } from '../../_services/resources/resources.service'
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidateResource {

    constructor(private resourceService: ResourcesService) {}
    /**
     * @description method for usage in Reactive Form validator or as
     * standalone validation
     * @param resourceService ResourcesService
     * @param value string
     * @returns
     */
    valid(value: string) {
        return this.resourceService.validateResourceId(value);
    }
}
