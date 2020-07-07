import { Configs } from '../interfaces/config.interface';
export class SqlServerRemoteConfig implements Configs {

    friendlyName = 'SqlServerRemote';
    type = 'remote';
    fields = {
        servers: {
            label: "servers"
          },
          azuredb: {
            label: "azuredb"
          },
          queryExclusions: {
            label: "queryExclusions"
          }
    }
}