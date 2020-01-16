
interface Label {
    [key: string] : any
}
export interface Monitor {
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

export interface Monitors {
    content: Monitor[];
    number: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;

}