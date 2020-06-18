import { Configs } from '../interfaces/config.interface';
export class PostgresqlConfig implements Configs {

    friendlyName = 'Postgresql';
    type = 'local';
    fields = {
        address: {
            label:"address"
          },
          outputaddress: {
            label: "outputaddress"
          },
          maxLifetime: {
            label:"maxLifetime"
          },
          ignoredDatabases: {
            label:"ignoredDatabases"
          },
          databases: {
            label:"databases"
          }
    }
}