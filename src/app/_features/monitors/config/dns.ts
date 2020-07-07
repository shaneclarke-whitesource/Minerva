import { Configs } from '../interfaces/config.interface';
export class DnsConfig implements Configs {

    friendlyName = 'Dns';
    type = 'remote';
    fields = {
        dnsServer: {
            label: "dnsServer",
        },
        domain: {
            label: "domain",
        },
        network: {
            label: "network",
        },
        recordType: {
            label: "recordType",
        },
        port: {
            label: "port"
        },
        timeout: {
            label: "timeout",
        }
    }
}