import { default as resourceMockCollection} from './collection.json';
import {default as resourceMockSingle } from './single.json';
import { Resource, Resources } from 'src/app/_models/resources.js';

let resource: Resource = <Resource>{
    tenantId: resourceMockSingle.tenantId,
    resourceId: resourceMockSingle.resourceId,
    presenceMonitoringEnabled: resourceMockSingle.presenceMonitoringEnabled,
    associatedWithEnvoy: resourceMockSingle.associatedWithEnvoy,
    createdTimestamp: new Date(resourceMockSingle.createdTimestamp),
    updatedTimestamp: new Date(resourceMockSingle.updatedTimestamp),
    labels: {
        agent_discovered_arch: resourceMockSingle.labels.agent_discovered_arch,
        agent_discovered_hostname: resourceMockSingle.labels["agent.discovered.hostname"],
        agent_discovered_os: resourceMockSingle.labels.agent_discovered_os
    },
    metadata: resourceMockSingle.metadata
}

export class resourcesMock {
    collection: any = resourceMockCollection;
    single: Resource = resource;
}
