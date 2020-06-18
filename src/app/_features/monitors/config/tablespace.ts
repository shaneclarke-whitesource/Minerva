import { Configs } from '../interfaces/config.interface';
export class TablespaceConfig implements Configs {

    friendlyName = 'Tablespace';
    type = 'local';
    fields = {
        databaseNames: {
            label: "databaseNames"
        },
        filePath: {
            label: "filePath"
        }
    }
}