import { default as labelResources } from './labelResources.json';
import { default as labelMonitors } from './labelMonitors.json';
import { LabelResources, LabelMonitors } from '../../_models/labels.js';

export class LabelMock {
    resourceLabels: LabelResources = labelResources;
    monitorLabels: LabelMonitors = labelMonitors;
}
