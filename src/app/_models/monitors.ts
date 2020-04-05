
interface Label {
    [key: string] : any
}
export interface IMonitor {
    id: string;
    name?: string;
    labelSelectorMethod: string;
    interval: string;
    labelSelector: Label;
    details: {
        type: string,
        plugin: {
            type: string,
            [key: string] : any
        }
    }
    createdTimestamp: string;
    updatedTimestamp: string;
}

export interface IMonitors {
    content: IMonitor[];
    number: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;

}

export interface ISchema {
    $schema: string,
    title: string,
    description: string,
    type: any,
    additionalProperties: boolean,
    properties: {
        name: any,
        [x:string]: any
    },
    definitions: any
}