export interface IMetrics {
    name: string;
    mean: number;
    time: number;
}

export interface IMetricField {
    name: string;
    fieldKey: string;
    fieldType: string;
}

export interface IMeasurement {
    name: string;
}

export interface IDevices {
    name: string;
    deviceLable: string;
    device: string;
}
