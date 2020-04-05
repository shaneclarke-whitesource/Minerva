import { default as labelResources } from './labelResources.json';
import { default as labelMonitors } from './labelMonitors.json';
import { ILabelResources, ILabelMonitors } from '../../_models/labels.js';

export class LabelMock {
    resourceLabels: ILabelResources = labelResources;
    monitorLabels: ILabelMonitors = labelMonitors;
}
