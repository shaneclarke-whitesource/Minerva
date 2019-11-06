
interface Labels {
    agent_discovered_arch: string;
    agent_discovered_hostname: string;
    agent_discovered_os: string;

    [x: string]: any
}
export interface Resource {
    tenantId: string;
    resourceId: string;
    labels: Labels;
    metadata: {
        [x: string]: any;
    }
    presenceMonitoringEnabled: boolean;
    associatedWithEnvoy: boolean;
    createdTimestamp: Date;
    updatedTimestamp: Date;
}

export interface Resources {
    content: Resource[];
    number: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;

}