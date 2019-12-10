import { async, TestBed } from '@angular/core/testing';
import { ValidateResource } from './resourceName.validator'
import { ResourcesService } from 'src/app/_services/resources/resources.service';

describe('invalidResourceName', () => {
    let injector: TestBed;
    let resourceService: ResourcesService;
    beforeEach(async(() => {
        resourceService = injector.get(ResourcesService);
    }));

    it('should create validator', () => {
        expect(ValidateResource).toBeTruthy();
    });

    it('should validate resource ID', () => {
        /**
         * Finish test validate resource
         */
    });

});