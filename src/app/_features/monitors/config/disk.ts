
export class DiskConfig {

    friendlyName:string = 'Disk';
    // local or remote
    type:string = 'local';
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