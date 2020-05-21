import { Configs } from '../interfaces/config.interface';
export class NetResponseConfig implements Configs {

    friendlyName = 'NetResponse';
    type = 'remote';
    fields = {
        "protocol": {
            label:"protocol",
            
          },
          "host": {
            label:"host",
          },
          "port": {
            label:"port",
          },
          "timeout": {
            label:"timeout",
          },
          "readTimeout": {
            label:"readTimeout",
          },
          "send": {
            label:"send",
          },
          "expect": {
            label:"expect",
          }
    }
}