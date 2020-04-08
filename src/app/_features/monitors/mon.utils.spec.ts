import { async } from '@angular/core/testing';
import { FormatMonitorUtil } from './mon.utils';
import {
    CreateMonitor,
    Cpu
} from 'src/app/_models/salus.monitor'

describe('AddMonitorFromType', () => {

    let newMonitor: CreateMonitor;
    beforeEach(async(() => {
        newMonitor = {
            name: 'Tight Monitor',
            labelSelector: {
                agent_discovered_os: 'linux',
                agent_hostname: 'mranderson'
            },
            labelSelectorMethod: 'AND',
            resourceId: '45544',
            excludedResourceIds: ['8774736', '6355266'],
            interval: '60'

        };
    }));

    it('should create utility', () => {
        expect(FormatMonitorUtil).toBeTruthy();
    });

    it('should format and add defaults', () => {
        let monitor:CreateMonitor = FormatMonitorUtil('', newMonitor);
        expect(monitor.name).toEqual(newMonitor.name);
        expect(monitor.labelSelector).toEqual(newMonitor.labelSelector);
        expect(monitor.labelSelectorMethod).toEqual(newMonitor.labelSelectorMethod);
        expect(monitor.resourceId).toEqual(newMonitor.resourceId);
        expect(monitor.excludedResourceIds.length).toEqual(2);
        expect(monitor.interval).toEqual(newMonitor.interval);
    });

    it('should format a CPU Monitor', () => {
        let monitor = {
            ...(newMonitor),
            cpu: {
                percpu: true,
                totalcpu: false,
                collectCpuTime: false,
                reportActive: true
            }
        }
        let cpuMonitor = FormatMonitorUtil('cpu', monitor);
        expect(cpuMonitor.details.type).toEqual('local');
        expect(cpuMonitor.details.plugin.type).toEqual('cpu');
        expect(cpuMonitor.details.plugin['percpu']).toEqual(monitor.cpu.percpu);
        expect(cpuMonitor.details.plugin['totalcpu']).toEqual(monitor.cpu.totalcpu);
        expect(cpuMonitor.details.plugin['collectCpuTime']).toEqual(monitor.cpu.collectCpuTime);
        expect(cpuMonitor.details.plugin['reportActive']).toEqual(monitor.cpu.reportActive);
    });




});