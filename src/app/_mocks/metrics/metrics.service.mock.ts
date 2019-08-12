import { default as metricsDevices } from './devices.json';
import { default as metricsFields } from './fields.json';
import { default as metrics } from './metrics.json';
import { default as metricMeasurements } from './measurements.json';

import {
    IDevices,
    IMeasurement,
    IMetricField,
    IMetrics
} from '../../_models/metrics';

export class metricMocks {
    devices: IDevices[] = metricsDevices;
    fields: IMetricField[] = metricsFields;
    metrics: IMetrics[] = metrics;
    measurements: IMeasurement[] = metricMeasurements;
}
