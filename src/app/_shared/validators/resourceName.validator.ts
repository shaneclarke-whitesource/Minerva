import { ResourcesService } from '../../_services/resources/resources.service'

export class ValidateResource {
    static valid(resourceService: ResourcesService, value: string) {
        return resourceService.validateResourceId(value);
    }
}
