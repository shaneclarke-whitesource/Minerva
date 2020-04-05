import {
    ICreateMonitor
} from 'src/app/_models/salus.monitor'

/**
* @description a utility for formatting the post of a
* @param
* @returns {}
*/
function FormatMonitorUtil(type: string, formData: any): ICreateMonitor {
    let createMonitor: ICreateMonitor = {
        ...(formData.name && { name: formData.name }),
        ...(formData.labelSelector && {labelSelector: formData.labelSelector}),
        ...(formData.labelSelectorMethod && {labelSelectorMethod : formData.labelSelectorMethod}),
        ...(formData.resourceId && {resourceId : formData.resourceId }),
        ...(formData.excludedResourceIds && {excludedResourceIds: formData.excludedResourceIds}),
        ...(formData.interval && { interval: formData.interval })
    };

    switch (type.toLowerCase()) {
        case 'cpu':
            createMonitor.details = {
                type: "local",
                plugin: {
                    type: "cpu",
                    ...(formData.cpu.hasOwnProperty('percpu') && { percpu: formData.cpu.percpu }),
                    ...(formData.cpu.hasOwnProperty('totalcpu') && {totalcpu: formData.cpu.totalcpu }),
                    ...(formData.cpu.hasOwnProperty('collectCpuTime') && {collectCpuTime: formData.cpu.collectCpuTime}),
                    ...(formData.cpu.hasOwnProperty('reportActive') && {reportActive: formData.cpu.reportActive})
                }
            };
            break;
        default:
            createMonitor.details = null;
            break;
    }

    return createMonitor;
}


export { FormatMonitorUtil }