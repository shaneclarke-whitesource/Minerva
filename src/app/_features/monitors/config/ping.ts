import { Configs } from '../interfaces/config.interface';
export class PingConfig implements Configs {

    friendlyName = 'Ping';
    type = 'remote';
    fields = {
        target: {
           label: "target"
          },
          count: {
           label: "count"
          },
          pingInterval: {
           label: "pingInterval"
          },
          timeout: {
           label: "timeout"
          },
          deadline: {
           label: "deadline"
          }
    }
}