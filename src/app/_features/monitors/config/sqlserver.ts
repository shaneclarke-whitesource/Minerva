import { Configs } from '../interfaces/config.interface';
export class SqlServerConfig implements Configs {

    friendlyName = 'SqlServer';
    type = 'local';
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