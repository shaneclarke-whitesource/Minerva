
import { Configs } from '../interfaces/config.interface';
export class PostgresqlRemoteConfig implements Configs {

    friendlyName = 'PostgresqlRemote';
    type = 'remote';
    fields = {
        address: {
           label: "address"            
          },
          outputaddress: {
           label: "outputaddress"
          },
          maxLifetime: {
           label: "maxLifetime"
          },
          ignoredDatabases: {
           label: "ignoredDatabases"
          },
          databases: {
           label: "databases"
          }
    }
}