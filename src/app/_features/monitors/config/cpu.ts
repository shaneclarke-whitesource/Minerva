import { Configs } from '../interfaces/config.interface';
export class CPUConfig implements Configs {

    friendlyName = 'CPU';
    type = 'local';
    fields = {
        percpu: {
            label: 'CPU Percentage'
        },
        totalcpu: {
            label: 'Total CPU'
        },
        collectCpuTime: {
            label: 'Collect CPU Time'
        },
        reportActive: {
            label: 'Report Active'
        }
    }
}