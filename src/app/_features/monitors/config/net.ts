
export class NetworkConfig {

    friendlyName:string = 'Network';
    // local or remote
    type:string = 'local';
    fields = {
        ignoreProtocolStats: {
            label: 'Ignore Protocal Stats'
        },
        interface: {
            label: 'Interface'
        },
         }
}